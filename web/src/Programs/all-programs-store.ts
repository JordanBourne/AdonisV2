import { ProgramIsFetched } from './action-symbols';
import { ProgramDb } from './types';

interface AllPrograms {
    [key: string]: ProgramDb
};

const initialState : AllPrograms = { };

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case ProgramIsFetched:
      return {
        ...state,
        [action.program.programId]: action.program
      };
    default:
      return state
  }
}