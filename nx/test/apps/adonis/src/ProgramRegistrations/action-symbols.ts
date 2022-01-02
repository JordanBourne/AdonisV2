import { ProgramRegistrationDb } from "./types";

export const ProgramRegistrationIsFetched = 'ProgramRegistrations/ProgramRegistrationIsFetched';

export const ProgramIsFetchedActionFn = (programRegistrationDb: ProgramRegistrationDb) => ({ type: ProgramRegistrationIsFetched, programRegistrationDb });