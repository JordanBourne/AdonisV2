import { getAuthenticatedDynamoDBClient } from '../util/dynamo';

import { PutItemCommand, ScanCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';
import { ProgramDb } from './types';

import * as RootStore from '../store';

export const createMockSbsRtf = async (): Promise<void> => {
  const output = await getAuthenticatedDynamoDBClient();
  if (output === null) {
    throw ('Could not retrieve set since the client is not logged in, createMockSbsRtf should not have been called yet.');
  }
  const { cognitoIdentityId, dynamoDbClient } = output;
  const command = new PutItemCommand({
    Item: marshall({
      cognitoIdentityId,
      programId: `${cognitoIdentityId}-STSRTF`
    }),
    TableName: DynamoDBTableName
  });
  await dynamoDbClient.send(command);
};

export const getAllPrograms = async (): Promise<ProgramDb[]> => {
  const output = await getAuthenticatedDynamoDBClient();
  if (output === null) {
    throw ('Could not retrieve set since the client is not logged in, getAllPrograms should not have been called yet.');
  }
  const { cognitoIdentityId, dynamoDbClient } = output;
  const command = new ScanCommand({
    TableName: DynamoDBTableName
  });
  const items = (await dynamoDbClient.send(command)).Items?.map(e => unmarshall(e)) as ProgramDb[];
  return items;
};