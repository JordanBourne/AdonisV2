import { ProgramDb } from './types';
import { createProgramRegistrationObject } from '../ProgramRegistrations/actions';
import { registerProfileToProgramRegistrationObject } from '../Profile/actions';
import { batchAndSaveSetsToDb } from '../Sets/dynamo';
import { SetDb } from '../Sets/types';
import { MovementDto } from './types';
import { getAuthenticatedDynamoDBClient } from '../util/dynamo';
import * as uuid from 'uuid';

interface MovementsConfiguration {
    [ key: string ]: MovementDto
};

export const registerForProgram = async (program : ProgramDb, daysPerWeek : number, movementsConfiguration : MovementsConfiguration) => {    
    const output = await getAuthenticatedDynamoDBClient();
    if (output === null) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    const { cognitoIdentityCredentials, cognitoIdentityId, dynamoDbClient } = output;
    if (!cognitoIdentityId) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    console.log('Creating program registration');
    const programRegistrationDb = await createProgramRegistrationObject(program, daysPerWeek);
    await registerProfileToProgramRegistrationObject(programRegistrationDb);
    const allSets : SetDb[] = []
    for (const weekIdx in program.setScheme.weeks) {
        const week = program.setScheme.weeks[weekIdx];
        for (const dayIdx in program.daysPerWeek[daysPerWeek]) {
            const day = program.daysPerWeek[daysPerWeek][dayIdx];
            for (const movementAssignment of day) {
                const primaryAuxiliary = movementAssignment.includes('a') ? 'auxiliary' : 'primary'; 
                for (const setIdx in week.primary.sets) {
                    const repsExpected = week[primaryAuxiliary].sets[setIdx];
                    allSets.push({
                        cognitoIdentityId: cognitoIdentityId,
                        setId: uuid.v4(),
                        programId: program.programId,
                        programRegistrationId: programRegistrationDb.programRegistrationId,
                        programRegistrationIdWeekDay: `${programRegistrationDb.programRegistrationId}-${week}-${day}`,
                        movement: movementsConfiguration[movementAssignment].movement,
                        day: Number(dayIdx),
                        week: Number(weekIdx),
                        index: Number(setIdx),
                        percentOrm: week.primary.percent,
                        repsExpected: repsExpected,
                        repsCompleted: null
                    })
                }
            }
        }
    }

    
    console.log('Creating sets');
    await batchAndSaveSetsToDb(allSets);
};