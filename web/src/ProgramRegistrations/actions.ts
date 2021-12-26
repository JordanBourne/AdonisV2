import { GetItemCommand, PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';
import { sendDynamoCommand } from "../util/dynamo";
import { ProgramIsFetchedActionFn } from './action-symbols';

import { ProgramRegistrationDb } from './types';
import { ProgramDb } from '../Programs/types';
import { store } from '../store';

const { v4: uuidv4 } = require('uuid');

export const createProgramRegistrationObject = async (program: ProgramDb, daysPerWeek: number) => {
    const programRegistration: ProgramRegistrationDb = {
        cognitoIdentityId: 'COGNITO_IDENTITY_ID',
        programRegistrationId: uuidv4(),
        programId: program.programId,
        daysPerWeek
    };
    await sendDynamoCommand(new PutItemCommand({
        Item: marshall(programRegistration),
        TableName: DynamoDBTableName
    }));
    return programRegistration;
};

export const fetchProgramRegistration = async (programRegistrationId: string): Promise<ProgramRegistrationDb | null> => {
    try {
        console.group('FetchProgramRegistration');
        const command = new GetItemCommand({
            ConsistentRead: true,
            Key: {
                cognitoIdentityId: {
                    'S': 'COGNITO_IDENTITY_ID'
                },
                programRegistrationId: {
                    'S': programRegistrationId
                }
            },
            TableName: DynamoDBTableName
        });
        const response = await sendDynamoCommand(command);
        const responseItem = response?.Item ? unmarshall(response.Item) as ProgramRegistrationDb : null;
        if (responseItem === null) {
            console.log('Program Registration');
            console.groupEnd();
            throw ({
                code: 'PROGRAM_REGISTRATION_NOT_FOUND'
            });
        }
        console.log('Program Registration has been found');
        console.log(responseItem);
        store.dispatch(ProgramIsFetchedActionFn(responseItem));
        console.groupEnd();
        return responseItem;
    } catch (e) {
        throw (e);
    }
};