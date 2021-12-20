import { store } from '../store';
import { selectMyUsername } from '../Auth/selectors';
import { SetMyProfileAction } from './action-symbols';
import { profile, completedWorkout, } from './types';
import { trainingMax, lift } from '../Programs/types';
import { getAuthenticatedDynamoDBClient } from '../util/dynamo';

import { GetItemCommand, PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';

export const checkAndFetchMyProfile = async () => {
    const myUsername = selectMyUsername(store.getState());
    if (myUsername) {
        const myProfile: profile = await fetchProfile(myUsername) as profile;
        store.dispatch(SetMyProfileAction(myProfile));
    }
};

export const fetchProfile = async (username: string): Promise<profile | null> => {
    try {
        const output = await getAuthenticatedDynamoDBClient();
        if (output === null) {
            throw ('Could not retrieve set since the client is not logged in, fetchProfile should not have been called yet.');
        }
        const { cognitoIdentityId, dynamoDbClient } = output;
        const command = new GetItemCommand({
            Key: {
                cognitoIdentityId: {
                    'S': `${cognitoIdentityId}`
                }
            },
            TableName: DynamoDBTableName
        });
        const response = await dynamoDbClient.send(command);
        const responseItem = unmarshall(response?.Item ?? {}) as profile | null;
        return responseItem;
    } catch (e) {
        throw (e);
    }
};

export const setMyProfile = async (myProfile: profile): Promise<void> => {
    const output = await getAuthenticatedDynamoDBClient();
    if (output === null) {
        throw ('Could not retrieve set since the client is not logged in, fetchProfile should not have been called yet.');
    }
    const { cognitoIdentityId, dynamoDbClient } = output;
    const command = new PutItemCommand({
        Item: marshall({
            ...myProfile,
            username: `${cognitoIdentityId}`
        }),
        TableName: DynamoDBTableName
    });
    await dynamoDbClient.send(command);
};

export const completeWorkout = (
    completedWorkout: completedWorkout,
    newTrainingMaxes: { [key: string]: trainingMax }[],
    updatedLifts: { [key: string]: lift }[]
) => {
    return {
        payload: {
            completedWorkout,
            newTrainingMaxes,
            updatedLifts
        }
    }
};