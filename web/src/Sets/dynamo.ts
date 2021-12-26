import { sendDynamoCommand, getAuthenticatedDynamoDBClient } from '../util/dynamo';
import { SetDb } from './types';

import { pick } from 'lodash';
import { GetItemCommand, UpdateItemCommand, QueryCommand, BatchWriteItemCommand, PutRequest, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName, DynamoDBTodayIndexName } from './config';

import * as RootStore from '../store';

import { SetIsFetchedActionFn } from './action-symbols';

import { ProgramDb, MovementDto } from '../Programs/types';
import { ProgramRegistrationDb } from '../ProgramRegistrations/types';
import { chunk } from 'lodash';
const { v4: uuidv4 } = require('uuid');

export const batchAndSaveSetsToDb = async(sets: SetDb[]) => {
    await Promise.all(chunk(sets, 25).map(createChunkOfSets));
};

export interface CreateSetFromProgramObjectProps {
    movementDto: MovementDto;
    program: ProgramDb;
    programRegistration: ProgramRegistrationDb;
    day: number;
    week: number;
    index: number;
    percentOrm: number;
    repsExpected: number;
};

export const createChunkOfSets = async (sets: SetDb[]): Promise<void> => {
    const batchWriteItemCommand = new BatchWriteItemCommand({
        RequestItems: {
            [DynamoDBTableName]: sets.map(set => {
                const putRequest : PutRequest = {
                    Item: marshall(set)
                };
                return {
                    PutRequest: putRequest
                };
            })
        }
    });
    await sendDynamoCommand( batchWriteItemCommand, null );
    for (const setDb of sets) {
        RootStore.store.dispatch(
            SetIsFetchedActionFn(setDb)
        );
    }
};

const addCognitoIdentityIdToQuery = (command: QueryCommand, cognitoIdentityId: string) => {
    ((command.input.ExpressionAttributeValues || {})[':cognitoIdentityId'] || {})['S'] = cognitoIdentityId;
};

export interface FetchSetsForDayProps {
    week: number;
    day: number;
    programRegistrationId: string;
};
export const fetchSetsForDay = async (props: FetchSetsForDayProps, LastEvaluatedKey?: any ): Promise<void> => {    
    const queryCommand = new QueryCommand({
        KeyConditionExpression: 'cognitoIdentityId = :cognitoIdentityId and programRegistrationIdWeekDay = :programRegistrationIdWeekDay',
        ExpressionAttributeValues: {
            ':cognitoIdentityId': { 'S': 'COGNITO_IDENTITY_ID' },
            ':programRegistrationIdWeekDay': { 'S': `${props.programRegistrationId}-${props.week}-${props.day}` }
        },
        IndexName: DynamoDBTodayIndexName,
        TableName: DynamoDBTableName,
        ExclusiveStartKey: LastEvaluatedKey,
        Limit: 15,
    });
    const queryResults = await sendDynamoCommand( queryCommand, addCognitoIdentityIdToQuery );
    const batchGetItemCommand = new BatchGetItemCommand({
        RequestItems: {
            [DynamoDBTableName]: {
                Keys: queryResults.Items.map((item : SetDb) => pick(item, ['cognitoIdentityId', 'setId']))
            }
        }
    });
    const batchGetItemCommandResults = await sendDynamoCommand( batchGetItemCommand, null );
    for (const item of batchGetItemCommandResults.Responses[DynamoDBTableName]) {
        RootStore.store.dispatch(
            SetIsFetchedActionFn(unmarshall(item) as SetDb)
        );
    }
    if (queryResults.LastEvaluatedKey) {
        await fetchSetsForDay(props, queryResults.LastEvaluatedKey);
    }
};

export const fetchSet = async (setId: string): Promise<void> => {
    const response = await sendDynamoCommand(new GetItemCommand({
        Key: marshall({
            cognitoIdentityId: 'COGNITO_IDENTITY_ID',
            setId
        }),
        TableName: DynamoDBTableName
    }));
    const responseItem = unmarshall(response?.Item ?? {}) as SetDb | null;
    if (responseItem !== null) {
        RootStore.store.dispatch(
            SetIsFetchedActionFn(responseItem)
        );
    }
};

export const updateRepsCompleted = async (setId: string): Promise<void> => {
    await sendDynamoCommand(new UpdateItemCommand({
        Key: marshall({
            cognitoIdentityId: 'COGNITO_IDENTITY_ID',
            setId
        }),
        TableName: DynamoDBTableName
    }));
};