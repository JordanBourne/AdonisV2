import { RootState } from '../store';
import { values } from 'lodash';
import { ProgramDb } from './types';

export const selectAllPrograms = (state : RootState) : ProgramDb[] => values(state.allPrograms);
export const selectProgram = (programId : string) => (state : RootState) => state.allPrograms[programId];