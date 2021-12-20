import { getAuthenticatedDynamoDBClient } from '../util/dynamo';
import { SetDb } from './types';

import { GetItemCommand, UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';

import * as RootStore from '../store';

import { SetIsFetchedActionFn } from './action-symbols';
import { getSetSortKey } from './util';

export const fetchSet = async (setId: string): Promise<void> => {
  const output = await getAuthenticatedDynamoDBClient();
  if (output === null) {
    throw ('Could not retrieve set since the client is not logged in, fetchSet should not have been called yet.');
  }
  const { cognitoIdentityCredentials, cognitoIdentityId, dynamoDbClient } = output;
  if (!cognitoIdentityId) {
    throw('Unauthenticated user, fetchSet should not have been called');
  }
  const command = new GetItemCommand({
    Key: {
      cognitoIdentityId: {
        'S': cognitoIdentityId
      },
      setId: {
        'S': setId
      }
    },
    TableName: DynamoDBTableName
  });
  const response = await dynamoDbClient.send(command);
  const responseItem = unmarshall(response?.Item ?? {}) as SetDb | null;
  if (responseItem !== null) {
    RootStore.store.dispatch(
      SetIsFetchedActionFn(responseItem)
    );
  }
};
export const updateRepsCompleted = async (setId: string): Promise<void> => {
  const output = await getAuthenticatedDynamoDBClient();
  if (output === null) {
    throw ('Could not retrieve set since the client is not logged in, fetchSet should not have been called yet.');
  }
  const { cognitoIdentityCredentials, cognitoIdentityId, dynamoDbClient } = output;
  if (!cognitoIdentityId) {
    throw('Unauthenticated user, fetchSet should not have been called');
  }
  const command = new UpdateItemCommand({
    Key: {
      cognitoIdentityId: {
        'S': cognitoIdentityId
      },
      setId: {
        'S': setId
      }
    },
    TableName: DynamoDBTableName
  });
  await dynamoDbClient.send(command);
};