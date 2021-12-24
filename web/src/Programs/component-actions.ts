import { ProgramDb } from './types';
import { createProgramRegistrationObject } from '../ProgramRegistration/actions';
import { registerProfileToProgramRegistrationObject } from '../Profile/actions';
import { createChunkOfSets, CreateSetFromProgramObjectProps } from '../Sets/dynamo';
import { MovementDto } from './types';
import { chunk } from 'lodash';

interface MovementsConfiguration {
    [ key: string ]: MovementDto
};

export const registerForProgram = async (program : ProgramDb, daysPerWeek : number, movementsConfiguration : MovementsConfiguration) => {
    console.log('Creating program registration');
    const programRegistrationDb = await createProgramRegistrationObject(program);
    await registerProfileToProgramRegistrationObject(programRegistrationDb);
    const allSets : CreateSetFromProgramObjectProps[] = []
    for (const weekIdx in program.setScheme.weeks) {
        const week = program.setScheme.weeks[weekIdx];
        for (const dayIdx in program.daysPerWeek[daysPerWeek]) {
            const day = program.daysPerWeek[daysPerWeek][dayIdx];
            for (const movementAssignment of day) {
                const primaryAuxiliary = movementAssignment.includes('a') ? 'auxiliary' : 'primary'; 
                for (const setIdx in week.primary.sets) {
                    const repsExpected = week[primaryAuxiliary].sets[setIdx];
                    allSets.push({
                        movementDto: movementsConfiguration[movementAssignment],
                        program,
                        programRegistration: programRegistrationDb,
                        day: Number(dayIdx),
                        week: Number(weekIdx),
                        index: Number(setIdx),
                        percentOrm: week.primary.percent,
                        repsExpected,
                    })
                }
            }
        }
    }
    console.log('Creating sets');
    await Promise.all(chunk(allSets, 25).map(createChunkOfSets));
};