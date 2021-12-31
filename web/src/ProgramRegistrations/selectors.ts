import { RootState } from "../store";
import { ProgramRegistrationDb } from "./types";
import { last, first } from 'lodash';
export const selectProgramRegistration = (programRegistrationId: string) => (state: RootState) : ProgramRegistrationDb => state.programRegistrations[programRegistrationId];
export const selectNextDay = (programRegistrationId: string|null|undefined, week: number, day: number) => (state: RootState) : { week: number|null, day: number|null } => {
    if (!programRegistrationId) {
        return {week: null, day: null};
    }
    const programRegistration = state.programRegistrations[programRegistrationId];
    if (!programRegistration) {
        return {week: null, day: null};
    }
    const weeks = programRegistration.weeks;
    const weekIdx = weeks.indexOf(week);
    const days = programRegistration.days;
    const dayIdx = days.indexOf(day);
    if (day === last(days)) {
        if (week === last(weeks)) {
            return { week: null, day: null };
        }
        return { week: weeks[weekIdx + 1], day: first(days) as number };
    }
    return { week, day: days[dayIdx + 1] };
};
export const selectPreviousDay = (programRegistrationId: string|null|undefined, week: number, day: number) => (state: RootState) : { week: number|null, day: number|null } => {
    if (!programRegistrationId) {
        return {week: null, day: null};
    }
    const programRegistration = state.programRegistrations[programRegistrationId];
    if (!programRegistration) {
        return {week: null, day: null};
    }
    const weeks = programRegistration.weeks;
    const weekIdx = weeks.indexOf(week);
    const days = programRegistration.days;
    const dayIdx = days.indexOf(day);
    if (day === first(days)) {
        if (week === first(weeks)) {
            return { week: null, day: null };
        }
        return { week: weeks[weekIdx - 1], day: last(days) as number };
    }
    return { week, day: days[dayIdx - 1] };
};