import { ProgramDb } from './types';
import { createProgramRegistrationObject } from '../ProgramRegistrations/actions';
import { registerProfileToProgramRegistrationObject } from '../Profile/actions';
import { batchAndSaveSetsToDb } from '../Sets/dynamo';
import { SetDb } from '../Sets/types';
import { getAuthenticatedDynamoDBClient } from '../util/dynamo';
import { ProgramConfiguration, MovementConfiguration } from './types';
import { batchAndSaveOneRepMaxesToDb } from '../Orms/actions';
import { OrmDb } from '../Orms/types';
import * as uuid from 'uuid';

export const registerForProgram = async (program : ProgramDb, programConfiguration : ProgramConfiguration) => {    
    const output = await getAuthenticatedDynamoDBClient();
    if (output === null) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    const { cognitoIdentityCredentials, cognitoIdentityId, dynamoDbClient } = output;
    if (!cognitoIdentityId) {
        throw ('Could not reach out to dynamo since the client hasnt authenticated. This function should not have been called.');
    }
    console.log('Creating program registration');
    const programRegistrationDb = await createProgramRegistrationObject(program, programConfiguration);
    await registerProfileToProgramRegistrationObject(programRegistrationDb);
    const allSets : SetDb[] = []
    for (const weekIdx in program.setScheme.weeks) {
        const week = program.setScheme.weeks[weekIdx];
        for (const dayIdx in programConfiguration.days) {
            const day = programConfiguration.days[dayIdx];
            for (const movement of day.movements) {
                for (const setIdx in week[movement.assignment].sets) {
                    const set = {
                        cognitoIdentityId: cognitoIdentityId,
                        setId: uuid.v4(),
                        programId: program.programId,
                        programRegistrationId: programRegistrationDb.programRegistrationId,
                        programRegistrationIdWeekDay: `${programRegistrationDb.programRegistrationId}-${weekIdx}-${dayIdx}`,
                        movement: movement.name,
                        day: Number(dayIdx),
                        week: Number(weekIdx),
                        index: Number(setIdx),
                        percentOrm: week[movement.assignment].sets[setIdx].percent,
                        repsExpected: week[movement.assignment].sets[setIdx].repsExpected,
                        repsCompleted: null
                    };
                    allSets.push(set)
                }
            }
        }
    }

    console.log('Creating sets');
    await batchAndSaveSetsToDb(allSets);

    const allMovements : OrmDb[] = [];
    for(const dayIdx in programConfiguration.days) {
        const day = programConfiguration.days[dayIdx].movements;
        for (const movement of day) {
            const createdAtIso = new Date().toISOString()
            allMovements.push({
                cognitoIdentityId: cognitoIdentityId,
                ormId: uuid.v4(),
                createdAtIso,
                updatedAtIso: createdAtIso,
                movement: movement.name,
                "movement-label": `${movement.name}-latest`,
                label: 'latest',
                weight: movement.oneRepMax,
                reps: 1,
                calcOrm: movement.oneRepMax,
            });
            allMovements.push({
                cognitoIdentityId: cognitoIdentityId,
                ormId: uuid.v4(),
                createdAtIso,
                updatedAtIso: createdAtIso,
                movement: movement.name,
                "movement-label": `${movement.name}-${createdAtIso}`,
                label: createdAtIso,
                weight: movement.oneRepMax,
                reps: 1,
                calcOrm: movement.oneRepMax,
            });
        }
    }

    console.log('Creating oneRepMaxes');
    await batchAndSaveOneRepMaxesToDb(allMovements);
};