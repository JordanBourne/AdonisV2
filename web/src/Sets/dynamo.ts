import { sendDynamoCommand } from '../util/dynamo';
import { SetDb } from './types';

import { GetItemCommand, UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';

import * as RootStore from '../store';

import { SetIsFetchedActionFn } from './action-symbols';

export const fetchSet = async (setId: string): Promise<void> => {
  const response = await sendDynamoCommand(
    new GetItemCommand({
      Key: {
        cognitoIdentityId: {
          'S': 'COGNITO_IDENTITY_ID'
        },
        setId: {
          'S': setId
        }
      },
      TableName: DynamoDBTableName
    }),
    (command: any, cognitoIdentityId: string) => {
      command.input.Key.cognitoIdentityId['S'] = cognitoIdentityId;
    }
  );
  const responseItem = unmarshall(response?.Item ?? {}) as SetDb | null;
  if (responseItem !== null) {
    RootStore.store.dispatch(
      SetIsFetchedActionFn(responseItem)
    );
  }
};
export const updateRepsCompleted = async (setId: string): Promise<void> => {
  await sendDynamoCommand(new UpdateItemCommand({
    Key: {
      cognitoIdentityId: {
        'S': 'COGNITO_IDENTITY_ID'
      },
      setId: {
        'S': setId
      }
    },
    TableName: DynamoDBTableName
  }), (command: any, cognitoIdentityId: string) => {
    command.input.Key.cognitoIdentityId['S'] = cognitoIdentityId;
  });
};