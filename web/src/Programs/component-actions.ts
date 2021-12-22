import { ProgramDb } from './types';
import { createProgramRegistrationObject } from '../ProgramRegistration/actions';
export const registerForProgram = async (program : ProgramDb) => {
    await createProgramRegistrationObject(program);
};