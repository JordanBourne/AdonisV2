import { getCredentialsAndId } from '../Auth/util';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const getAuthenticatedDynamoDBClient = async () => {
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
        throw ('Unauthenticated user, we shouldn\'t have gotten to this point');
    }
    return { dynamoDbClient, cognitoIdentityCredentials, cognitoIdentityId };
};

export const sendDynamoCommand = async (command: any, updateCommandWithCognitoIdentityId? : (command : any, cognitoIdentityId : string) => void) : Promise<any> => {
    const output = await getAuthenticatedDynamoDBClient();
    if (output === null) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    const { cognitoIdentityCredentials, cognitoIdentityId, dynamoDbClient } = output;
    if (!cognitoIdentityId) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    if (updateCommandWithCognitoIdentityId) {
        updateCommandWithCognitoIdentityId(command, cognitoIdentityId);
    }
    await dynamoDbClient.send(command);
};