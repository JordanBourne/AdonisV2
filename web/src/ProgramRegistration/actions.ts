import { GetItemCommand, UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';
import { sendDynamoCommand } from "../util/dynamo";

import { ProgramRegistrationDb } from './types';
import { ProgramDb } from '../Programs/types';
const { v4: uuidv4 } = require('uuid');

export const createProgramRegistrationObject = async (program : ProgramDb) => {
    const programRegistration : ProgramRegistrationDb = {
        cognitoIdentityId: 'COGNITO_IDENTITY_ID',
        programRegistrationId: uuidv4(),
        programId: program.programId
    };
    await sendDynamoCommand(new UpdateItemCommand({
      Key: marshall(programRegistration),
      TableName: DynamoDBTableName
    }));
};