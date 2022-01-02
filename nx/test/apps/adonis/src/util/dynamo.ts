import { getCredentialsAndId } from '../Auth/util';
import { DynamoDBClient, PutItemCommand, UpdateItemCommand, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { queue } from 'async';

interface RateLimitedTask {
    dynamoDbClient: DynamoDBClient,
    command: any
}

const DynamoRateLimiting = queue(async(task : RateLimitedTask) => {
    const output = await task.dynamoDbClient.send(task.command);
    return output;
}, 10);

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

const addCognitoIdentityIdToCommand = (command: any, cognitoIdentityId: string) => {
    if (command.input.Key) {
        command.input.Key.cognitoIdentityId['S'] = cognitoIdentityId;
    }
    if (command.input.Item) {
        command.input.Item.cognitoIdentityId['S'] = cognitoIdentityId;
    }
};

export const sendDynamoCommand = async (command: any, updateCommandWithCognitoIdentityId : ((command : any, cognitoIdentityId : string) => void) | null = addCognitoIdentityIdToCommand) : Promise<any> => {
    console.log('Getting authenticated client');
    const output = await getAuthenticatedDynamoDBClient();
    console.log('Got authenticated client');
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
    return await DynamoRateLimiting.push({
        dynamoDbClient,
        command
    });
};