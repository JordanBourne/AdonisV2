import { ProgramRegistrationIsFetched } from './action-symbols';
import { ProgramRegistrationDb } from './types';

interface MyProgramRegistrations {
    [key: string]: ProgramRegistrationDb
};

const initialState : MyProgramRegistrations = { };

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case ProgramRegistrationIsFetched:
      return {
        ...state,
        [ action.programRegistrationDb.programRegistrationId ]: action.programRegistrationDb
      };
    default:
      return state
  }
}