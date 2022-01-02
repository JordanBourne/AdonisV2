import { PutItemCommand, BatchWriteItemCommand, PutRequest, QueryCommand, BatchGetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { store } from '../store';
import { OrmIsFetchedActionFn } from './action-symbols';
import { OrmDb } from './types';
import * as uuid from 'uuid';
import { DynamoDBTableName, DynamoDBLabelIndexName } from './config';
import { sendDynamoCommand } from '../util/dynamo';
import { MovementConfiguration } from '../Programs/types';
import { chunk, pick } from 'lodash';



type EachCallback = (ormDb: OrmDb[]) => void;
const DefaultEachCallback = (_ormDb: OrmDb[]) => {
    return;
};

export const batchAndSaveOneRepMaxesToDb = async (orms: OrmDb[], eachCallback : EachCallback = DefaultEachCallback) => {
    await Promise.all(
        chunk(orms, 25)
        .map(
            (setOfOrms) => createChunkOfOneRepMaxes(setOfOrms)
                .then(eachCallback)
        )
    );
};

export const createChunkOfOneRepMaxes = async (orms: OrmDb[]): Promise<OrmDb[]> => {
    const batchWriteItemCommand = new BatchWriteItemCommand({
        RequestItems: {
            [DynamoDBTableName]: orms.map(orm => {
                const putRequest : PutRequest = {
                    Item: marshall(orm)
                };
                return {
                    PutRequest: putRequest
                };
            })
        }
    });
    const output = await sendDynamoCommand( batchWriteItemCommand, null );
    for (const ormDb of orms) {
        if (ormDb.label === 'latest') {
            store.dispatch(
                OrmIsFetchedActionFn(ormDb)
            );
        }
    }
    return orms;
};

const addCognitoIdentityIdToQuery = (command: QueryCommand, cognitoIdentityId: string) => {
    ((command.input.ExpressionAttributeValues || {})[':cognitoIdentityId'] || {})['S'] = cognitoIdentityId;
};

export const fetchLatestOrms = async (LastEvaluatedKey?: any ): Promise<void> => {    
    const queryCommand = new QueryCommand({
        KeyConditionExpression: 'cognitoIdentityId = :cognitoIdentityId and #label = :label',
        ExpressionAttributeValues: {
            ':cognitoIdentityId': { 'S': 'COGNITO_IDENTITY_ID' },
            ':label': { 'S': 'latest' }
        },
        ExpressionAttributeNames: {
            '#label': 'label'
        },
        IndexName: DynamoDBLabelIndexName,
        TableName: DynamoDBTableName,
        ExclusiveStartKey: LastEvaluatedKey,
        Limit: 15,
    });
    const queryResults = await sendDynamoCommand( queryCommand, addCognitoIdentityIdToQuery );
    if (!queryResults?.Items?.length) {
        return;
    }
    const batchGetItemCommand = new BatchGetItemCommand({
        RequestItems: {
            [DynamoDBTableName]: {
                Keys: queryResults.Items.map((item : OrmDb) => pick(item, ['cognitoIdentityId', 'ormId']))
            }
        }
    });
    const batchGetItemCommandResults = await sendDynamoCommand( batchGetItemCommand, null );
    for (const item of batchGetItemCommandResults.Responses[DynamoDBTableName]) {
        store.dispatch(
            OrmIsFetchedActionFn(unmarshall(item) as OrmDb)
        );
    }
    if (queryResults.LastEvaluatedKey) {
        await fetchLatestOrms(queryResults.LastEvaluatedKey);
    }
};