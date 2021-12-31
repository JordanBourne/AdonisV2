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
        const responseItem = response?.Item ? unmarshall(response.Item) as ProfileDb : null;
        if (responseItem === null) {
            throw({
                code: 'PROFILE_NOT_FOUND'
            });
        }
        store.dispatch(SetMyProfileAction(responseItem));
        return responseItem;
    } catch (e) {
        throw (e);
    }
};

export const createProfile = async () => {
    await setMyProfile({
        autoregulationSchemeId: null,
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
        UpdateExpression: 'SET week=:week, #day=:day, programRegistrationId=:programRegistrationId, programId=:programId, autoregulationSchemeId=:autoregulationSchemeId',
        ExpressionAttributeValues: {
            ':week': { 'N': '1' },
            ':day': { 'N': '1' },
            ':programRegistrationId': { 'S': programRegistration.programRegistrationId },
            ':programId': { 'S': programRegistration.programId },
            ':autoregulationSchemeId': { 'S': programRegistration.autoregulationSchemeId }
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