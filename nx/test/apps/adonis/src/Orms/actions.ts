import { PutItemCommand, BatchWriteItemCommand, PutRequest, QueryCommand, BatchGetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { store } from '../store';
import { OrmIsFetchedActionFn } from './action-symbols';
import { OrmDb } from './types';
import * as uuid from 'uuid';
import { DynamoDBTableName, DynamoDBMovementLabelIndexName, DynamoDBLabelIndexName } from './config';
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

export const fetchLatestOrms = async (LastEvaluatedKey?: any ): Promise<OrmDb[]> => {    
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
        return [];
    }
    const batchGetItemCommand = new BatchGetItemCommand({
        RequestItems: {
            [DynamoDBTableName]: {
                Keys: queryResults.Items.map((item : OrmDb) => pick(item, ['cognitoIdentityId', 'ormId']))
            }
        }
    });
    const batchGetItemCommandResults = await sendDynamoCommand( batchGetItemCommand, null );
    const unmarshalledItems : OrmDb[] = batchGetItemCommandResults.Responses[DynamoDBTableName].map((i:any) => unmarshall(i) as OrmDb);
    for (const item of unmarshalledItems) {
        store.dispatch(
            OrmIsFetchedActionFn(item)
        );
    }
    if (queryResults.LastEvaluatedKey) {
        return unmarshalledItems.concat(await fetchLatestOrms(queryResults.LastEvaluatedKey));
    }
    return unmarshalledItems;
};

export const fetchAllOrms = async (LastEvaluatedKey?: any ): Promise<OrmDb[]> => {    
    const queryCommand = new QueryCommand({
        KeyConditionExpression: 'cognitoIdentityId = :cognitoIdentityId',
        ExpressionAttributeValues: {
            ':cognitoIdentityId': { 'S': 'COGNITO_IDENTITY_ID' }
        },
        TableName: DynamoDBTableName,
        ExclusiveStartKey: LastEvaluatedKey,
        Limit: 15,
    });
    const queryResults = await sendDynamoCommand( queryCommand, addCognitoIdentityIdToQuery );
    if (!queryResults?.Items?.length) {
        return [];
    }
    const batchGetItemCommand = new BatchGetItemCommand({
        RequestItems: {
            [DynamoDBTableName]: {
                Keys: queryResults.Items.map((item : OrmDb) => pick(item, ['cognitoIdentityId', 'ormId']))
            }
        }
    });
    const batchGetItemCommandResults = await sendDynamoCommand( batchGetItemCommand, null );
    const unmarshalledItems : OrmDb[] = batchGetItemCommandResults.Responses[DynamoDBTableName].map((i:any) => unmarshall(i) as OrmDb);
    for (const item of unmarshalledItems) {
        store.dispatch(
            OrmIsFetchedActionFn(item)
        );
    }
    if (queryResults.LastEvaluatedKey) {
        return unmarshalledItems.concat(await fetchAllOrms(queryResults.LastEvaluatedKey));
    }
    return unmarshalledItems;
};

export const fetchLatestOrmsByMovementLabel = async (movement: string, label: string = 'latest', LastEvaluatedKey?: any ): Promise<OrmDb[]> => {    
    const queryCommand = new QueryCommand({
        KeyConditionExpression: 'cognitoIdentityId = :cognitoIdentityId and #movementLabel = :movementLabel',
        ExpressionAttributeValues: {
            ':cognitoIdentityId': { 'S': 'COGNITO_IDENTITY_ID' },
            ':movementLabel': { 'S': `${movement}-${label}`}
        },
        ExpressionAttributeNames: {
            '#movementLabel': 'movement-label',
        },
        IndexName: DynamoDBMovementLabelIndexName,
        TableName: DynamoDBTableName,
        ExclusiveStartKey: LastEvaluatedKey,
        Limit: 15,
    });
    const queryResults = await sendDynamoCommand( queryCommand, addCognitoIdentityIdToQuery );
    if (!queryResults?.Items?.length) {
        return [];
    }
    const batchGetItemCommand = new BatchGetItemCommand({
        RequestItems: {
            [DynamoDBTableName]: {
                Keys: queryResults.Items.map((item : OrmDb) => pick(item, ['cognitoIdentityId', 'ormId']))
            }
        }
    });
    const batchGetItemCommandResults = await sendDynamoCommand( batchGetItemCommand, null );
    const unmarshalledItems : OrmDb[] = batchGetItemCommandResults.Responses[DynamoDBTableName].map((i : any) => unmarshall(i) as OrmDb);
    for (const item of unmarshalledItems) {
        store.dispatch(
            OrmIsFetchedActionFn(item)
        );
    }
    if (queryResults.LastEvaluatedKey) {
        return unmarshalledItems.concat(await fetchLatestOrmsByMovementLabel(movement, label, queryResults.LastEvaluatedKey));
    }
    return unmarshalledItems;
};

export const fetchLatestOrmsByLabel = async (movement: string, label: string = 'latest', LastEvaluatedKey?: any ): Promise<OrmDb[]> => {    
    const queryCommand = new QueryCommand({
        KeyConditionExpression: 'cognitoIdentityId = :cognitoIdentityId and #label = :label',
        ExpressionAttributeValues: {
            ':cognitoIdentityId': { 'S': 'COGNITO_IDENTITY_ID' },
            ':label': { 'S': label },
        },
        ExpressionAttributeNames: {
            '#label': 'label',
        },
        IndexName: DynamoDBLabelIndexName,
        TableName: DynamoDBTableName,
        ExclusiveStartKey: LastEvaluatedKey,
        Limit: 15,
    });
    const queryResults = await sendDynamoCommand( queryCommand, addCognitoIdentityIdToQuery );
    if (!queryResults?.Items?.length) {
        return [];
    }
    const batchGetItemCommand = new BatchGetItemCommand({
        RequestItems: {
            [DynamoDBTableName]: {
                Keys: queryResults.Items.map((item : OrmDb) => pick(item, ['cognitoIdentityId', 'ormId']))
            }
        }
    });
    const batchGetItemCommandResults = await sendDynamoCommand( batchGetItemCommand, null );
    const unmarshalledItems : OrmDb[] = batchGetItemCommandResults.Responses[DynamoDBTableName].map((i : any) => unmarshall(i) as OrmDb)
        .filter((i:any) => i.movement === movement);
    for (const item of unmarshalledItems) {
        store.dispatch(
            OrmIsFetchedActionFn(item)
        );
    }
    if (queryResults.LastEvaluatedKey) {
        return unmarshalledItems.concat(await fetchLatestOrmsByMovementLabel(movement, label, queryResults.LastEvaluatedKey));
    }
    return unmarshalledItems;
};

export const updateOrmLabel = async (ormDb: OrmDb, newLabel: string): Promise<void> => {    
    const updateItemCommand = new UpdateItemCommand({
        Key: marshall({
            cognitoIdentityId: 'COGNITO_IDENTITY_ID',
            ormId: ormDb.ormId
        }),
        ExpressionAttributeValues: {
            ':newMovementLabel': { 'S': `${ormDb.movement}-${newLabel}` },
            ':newLabel': { 'S': newLabel }
        },
        ExpressionAttributeNames: {
            '#movementLabel': 'movement-label',
            '#label': 'label'
        },
        UpdateExpression: 'SET #label = :newLabel, #movementLabel = :newMovementLabel',
        TableName: DynamoDBTableName
    });
    await sendDynamoCommand( updateItemCommand );
};