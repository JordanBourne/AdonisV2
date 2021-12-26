import { ProgramDb } from './types';
export const ProgramIsFetched = 'Set/ProgramIsFetched';

export const ProgramIsFetchedActionFn = (program: ProgramDb) => ({ type: ProgramIsFetched, program });