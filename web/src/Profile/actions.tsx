import { store } from '../store';
import { selectMyUsername } from '../Auth/selectors';
import { SetMyProfileAction } from './action-symbols';
import { profile, completedWorkout, } from './types';
import { trainingMax, lift } from '../workout';
import { getCognitoIdentityCredentials } from '../Auth/util';

import { GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBTableName } from './config';

export const checkAndFetchMyProfile = async () => {
  const myUsername = selectMyUsername(store.getState());
  if (myUsername) {
    const myProfile: profile = await fetchProfile(myUsername) as profile;
    store.dispatch(SetMyProfileAction(myProfile));
  }
};

export const fetchProfile = async (username: string): Promise<profile | null> => {
  const cognitoIdentityCredentials = await getCognitoIdentityCredentials();
  if (cognitoIdentityCredentials === null) {
    throw (new Error('Attempting to access dynamo, but not authenticated. fetchProfile should not have been called yet.'));
  }
  console.log('@@ START 1');
  const dynamoDbClient = new DynamoDBClient({
    region: 'us-west-2',
    credentials: cognitoIdentityCredentials
  });
  const command = new GetItemCommand({
    Key: {
      username: {
        'S': `${username}/profile`
      }
    },
    TableName: DynamoDBTableName
  });
  const response = await dynamoDbClient.send(command);
  console.log(response.Item);
  // const responseItem : profile|null = (response?.Item as unknown) ?? null;
  return null;
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