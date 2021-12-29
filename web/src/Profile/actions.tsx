import { store } from '../store';
import { SetMyProfileAction } from './action-symbols';
import { ProfileDb, completedWorkout, } from './types';
import { trainingMax, lift } from '../Programs/types';
import { sendDynamoCommand } from '../util/dynamo';

import { GetItemCommand, PutItemCommand, DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';
import { ProgramRegistrationDb } from '../ProgramRegistrations/types';

export const fetchMyProfile = async (): Promise<ProfileDb | null> => {
    try {
        console.group('FetchProfile');
        const command = new GetItemCommand({
            ConsistentRead: true,
            Key: {
                cognitoIdentityId: {
                    'S': 'COGNITO_IDENTITY_ID'
                }
            },
            TableName: DynamoDBTableName
        });
        const response = await sendDynamoCommand(command);
        console.log(command.input.Key);
        console.log(response);
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
        programId: null,
        week: null,
        day: null,
        roundingSettings: {
            rounding: 5,
            microPlates: false
        }
    });
};

export const setMyProfile = async (myProfile: ProfileDb): Promise<void> => {
    const command = new PutItemCommand({
        Item: marshall({
            ...myProfile,
            cognitoIdentityId: 'COGNITO_IDENTITY_ID'
        }),
        TableName: DynamoDBTableName
    });
    await sendDynamoCommand(command);
    store.dispatch(SetMyProfileAction(myProfile));
};

export const registerProfileToProgramRegistrationObject = async (programRegistration: ProgramRegistrationDb): Promise<void> => {
    const command = new UpdateItemCommand({
        Key: {
            'cognitoIdentityId': { 'S': 'COGNITO_IDENTITY_ID' }
        },
        UpdateExpression: 'SET week=:week, #day=:day, programRegistrationId=:programRegistrationId, programId=:programId',
        ExpressionAttributeValues: {
            ':week': { 'N': '1' },
            ':day': { 'N': '1' },
            ':programRegistrationId': { 'S': programRegistration.programRegistrationId },
            ':programId': { 'S': programRegistration.programId }
        },
        ExpressionAttributeNames: {
            '#day': 'day',
        },
        TableName: DynamoDBTableName
    });
    await sendDynamoCommand(command);
    await fetchMyProfile();
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