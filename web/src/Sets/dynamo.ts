import { sendDynamoCommand } from '../util/dynamo';
import { SetDb } from './types';

import { GetItemCommand, UpdateItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBTableName } from './config';

import * as RootStore from '../store';

import { SetIsFetchedActionFn } from './action-symbols';

import { ProgramDb, MockMovementDto } from '../Programs/types';
import { ProgramRegistrationDb } from '../ProgramRegistration/types';
const { v4: uuidv4 } = require('uuid');

interface CreateSetFromProgramObjectProps {
    movementDto: MockMovementDto;
    program: ProgramDb;
    programRegistration: ProgramRegistrationDb;
    day: number;
    week: number;
    index: number;
    percentOrm: number;
    repsExpected: number;
    repsCompleted: number;
};

export const createSetFromProgramObject = async (props: CreateSetFromProgramObjectProps): Promise<void> => {
    const setDb: SetDb = {
        cognitoId: 'COGNITO_IDENTITY_ID',
        uniqueId: uuidv4(),
        programId: props.program.programId,
        programRegistrationId: props.programRegistration.programRegistrationId,
        movement: props.movementDto.movement,
        day: props.day,
        week: props.week,
        index: props.index,
        percentOrm: props.percentOrm,
        repsExpected: props.repsExpected,
        repsCompleted: null
    };
    await sendDynamoCommand(new PutItemCommand({
        Item: marshall( setDb ),
        TableName: DynamoDBTableName
    }));
};

export const fetchSet = async (setId: string): Promise<void> => {
    const response = await sendDynamoCommand(new GetItemCommand({
        Key: marshall({
            cognitoIdentityId: 'COGNITO_IDENTITY_ID',
            setId
        }),
        TableName: DynamoDBTableName
    }));
    const responseItem = unmarshall(response?.Item ?? {}) as SetDb | null;
    if (responseItem !== null) {
        RootStore.store.dispatch(
            SetIsFetchedActionFn(responseItem)
        );
    }
};
export const updateRepsCompleted = async (setId: string): Promise<void> => {
    await sendDynamoCommand(new UpdateItemCommand({
        Key: marshall({
            cognitoIdentityId: 'COGNITO_IDENTITY_ID',
            setId
        }),
        TableName: DynamoDBTableName
    }));
};