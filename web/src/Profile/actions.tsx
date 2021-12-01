import { store } from '../store';
import { selectMyUsername } from '../Auth/selectors';
import { SetMyProfileAction } from './action-symbols';
import { profile, completedWorkout, } from './types';
import { trainingMax, lift } from '../workout';
import { getCognitoIdentityCredentials, getCognitoUserSession, getCognitoIdentityId } from '../Auth/util';

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
    console.groupCollapsed('fetchProfile');
    const cognitoUserSession = await getCognitoUserSession();
    if (cognitoUserSession === null) {
      return null;
    }
    const cognitoIdentityId = await getCognitoIdentityId(cognitoUserSession);
    console.log(cognitoIdentityId);
    const cognitoIdentityCredentials = await getCognitoIdentityCredentials();
    if (cognitoIdentityCredentials === null) {
      throw (new Error('Attempting to access dynamo, but not authenticated. fetchProfile should not have been called yet.'));
    }
    const dynamoDbClient = new DynamoDBClient({
      region: 'us-west-2',
      credentials: cognitoIdentityCredentials
    });
    const command = new GetItemCommand({
      Key: {
        username: {
          'S': `${cognitoIdentityId}`
        }
      },
      TableName: DynamoDBTableName
    });
    const response = await dynamoDbClient.send(command);
    const responseItem = unmarshall(response?.Item ?? {}) as profile | null;
    console.log('Response Item');
    console.log(responseItem);
    return responseItem;
  } catch(e) {
    throw(e);
  } finally {
    console.groupEnd();
  }
};

export const setMyProfile = async (myProfile: profile): Promise<void> => {
  const cognitoUserSession = await getCognitoUserSession();
  if (cognitoUserSession === null) {
    return;
  }
  const cognitoIdentityId = await getCognitoIdentityId(cognitoUserSession);
  const cognitoIdentityCredentials = await getCognitoIdentityCredentials();
  if (cognitoIdentityCredentials === null) {
    throw (new Error('Attempting to access dynamo, but not authenticated. fetchProfile should not have been called yet.'));
  }
  const dynamoDbClient = new DynamoDBClient({
    region: 'us-west-2',
    credentials: cognitoIdentityCredentials
  });
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