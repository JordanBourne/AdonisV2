import { getCredentialsAndId } from '../Auth/util';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const getAuthenticatedDynamoDBClient = async() => {
    const output = await getCredentialsAndId();
    if (output === null) {
      return null;
    }
    const { cognitoIdentityCredentials, cognitoIdentityId } = output;
    const dynamoDbClient = new DynamoDBClient({
      region: 'us-west-2',
      credentials: cognitoIdentityCredentials
    });
    if (!cognitoIdentityId) {
      throw('Unauthenticated user, we shouldn\'t have gotten to this point');
    }
    return { dynamoDbClient, cognitoIdentityCredentials, cognitoIdentityId };
  };