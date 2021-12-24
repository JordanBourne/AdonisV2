import { sendDynamoCommand, getAuthenticatedDynamoDBClient } from '../util/dynamo';
import { SetDb } from './types';

import { GetItemCommand, UpdateItemCommand, QueryCommand, BatchWriteItemCommand, PutRequest } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName, DynamoDBTodayIndexName } from './config';

import * as RootStore from '../store';

import { SetIsFetchedActionFn } from './action-symbols';

import { ProgramDb, MovementDto } from '../Programs/types';
import { ProgramRegistrationDb } from '../ProgramRegistration/types';
const { v4: uuidv4 } = require('uuid');

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

export const createChunkOfSets = async (chunk: CreateSetFromProgramObjectProps[]): Promise<void> => {    
    const output = await getAuthenticatedDynamoDBClient();
    if (output === null) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    const { cognitoIdentityCredentials, cognitoIdentityId, dynamoDbClient } = output;
    if (!cognitoIdentityId) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }

    const sets : SetDb[] = [];
    const batchWriteItemCommand = new BatchWriteItemCommand({
        RequestItems: {
            [DynamoDBTableName]: chunk.map(set => {
                const item : SetDb = {
                    cognitoIdentityId: cognitoIdentityId,
                    setId: uuidv4(),
                    programId: set.program.programId,
                    programRegistrationId: set.programRegistration.programRegistrationId,
                    programRegistrationIdWeekDay: `${set.programRegistration.programRegistrationId}-${set.week}-${set.day}`,
                    movement: set.movementDto.movement,
                    day: set.day,
                    week: set.week,
                    index: set.index,
                    percentOrm: set.percentOrm,
                    repsExpected: set.repsExpected,
                    repsCompleted: null
                }
                console.log(item);
                sets.push(item);
                const putRequest : PutRequest = {
                    Item: marshall(item)
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
        ExclusiveStartKey: LastEvaluatedKey
    });
    const queryResults = await sendDynamoCommand( queryCommand, addCognitoIdentityIdToQuery );
    for (const item of queryResults.Items) {
        RootStore.store.dispatch(
            SetIsFetchedActionFn(item)
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