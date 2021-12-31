import { GetItemCommand, PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';
import { sendDynamoCommand } from "../util/dynamo";
import { ProgramIsFetchedActionFn } from './action-symbols';

import { ProgramRegistrationDb } from './types';
import { ProgramConfiguration, ProgramDb } from '../Programs/types';
import { store } from '../store';

const { v4: uuidv4 } = require('uuid');

export const createProgramRegistrationObject = async (program: ProgramDb, programConfiguration: ProgramConfiguration) => {
    const programRegistration: ProgramRegistrationDb = {
        cognitoIdentityId: 'COGNITO_IDENTITY_ID',
        autoregulationSchemeId: program.autoregulationSchemeId,
        programRegistrationId: uuidv4(),
        programId: program.programId,
        days: Object.keys(programConfiguration.days).map(Number),
        weeks: Object.keys(program.setScheme.weeks).map(Number)
    };
    await sendDynamoCommand(new PutItemCommand({
        Item: marshall(programRegistration),
        TableName: DynamoDBTableName
    }));
    store.dispatch(ProgramIsFetchedActionFn(programRegistration));
    return programRegistration;
};

export const fetchProgramRegistration = async (programRegistrationId: string): Promise<ProgramRegistrationDb | null> => {
    try {
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
            throw ({
                code: 'PROGRAM_REGISTRATION_NOT_FOUND'
            });
        }
        store.dispatch(ProgramIsFetchedActionFn(responseItem));
        return responseItem;
    } catch (e) {
        throw (e);
    }
};