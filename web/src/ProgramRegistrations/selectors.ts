import { RootState } from "../store";
import { ProgramRegistrationDb } from "./types";
export const selectProgramRegistration = (programRegistrationId: string) => (state: RootState) : ProgramRegistrationDb => state.programRegistrations[programRegistrationId];