import { store } from '../store';
import { SetMyProfileAction } from './action-symbols';
import { ProfileDb, completedWorkout, } from './types';
import { trainingMax, lift } from '../Programs/types';
import { getAuthenticatedDynamoDBClient } from '../util/dynamo';

import { GetItemCommand, PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';

export const fetchMyProfile = async (): Promise<ProfileDb | null> => {
    try {
        console.group('FetchProfile');
        const output = await getAuthenticatedDynamoDBClient();
        if (output === null) {
            console.groupEnd();
            throw ('Could not retrieve set since the client is not logged in, fetchProfile should not have been called yet.');
        }
        const { cognitoIdentityId, dynamoDbClient } = output;
        const command = new GetItemCommand({
            ConsistentRead: true,
            Key: {
                cognitoIdentityId: {
                    'S': `${cognitoIdentityId}`
                }
            },
            TableName: DynamoDBTableName
        });
        const response = await dynamoDbClient.send(command);
        const responseItem = response?.Item ? unmarshall(response.Item) as ProfileDb : null;
        if (responseItem === null) {
            console.log('Profile not found');
            console.groupEnd();
            throw({
                code: 'PROFILE_NOT_FOUND'
            });
        }
        console.log('Profile has been found');
        console.log(responseItem);
        store.dispatch(SetMyProfileAction(responseItem));
        console.groupEnd();
        return responseItem;
    } catch (e) {
        throw (e);
    }
};

export const createProfile = async () => {
    await setMyProfile({
        programRegistrationId: null,
        week: null,
        day: null,
        roundingSettings: {
            rounding: 5,
            microPlates: false
        }
    });
};

export const setMyProfile = async (myProfile: ProfileDb): Promise<void> => {
    const output = await getAuthenticatedDynamoDBClient();
    if (output === null) {
        throw ('Could not retrieve set since the client is not logged in, fetchProfile should not have been called yet.');
    }
    const { cognitoIdentityId, dynamoDbClient } = output;
    const command = new PutItemCommand({
        Item: marshall({
            ...myProfile,
            cognitoIdentityId: `${cognitoIdentityId}`
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