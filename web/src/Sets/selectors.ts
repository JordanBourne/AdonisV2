import type { RootState } from '../store';
import { SetDb } from './types';
export const selectSet = (setId: string) => (state: RootState) => state.sets[setId];

export interface SelectSetsForDayProps {
    week: number | null;
    day: number | null;
    programRegistrationId: string | null;
};
export const selectSetsForDay = (props: SelectSetsForDayProps) => (state: RootState) : SetDb[] => {
    if (props.week === null || props.day === null || props.programRegistrationId === null) {
        return [];
    }
    const sets : SetDb[] = [];
    for (const setId in state.sets) {
        const set = state.sets[setId];
        if (set.week === props.week
            && set.day === props.day
            && set.programRegistrationId === props.programRegistrationId) {
                sets.push(set);
            }
    }
    return sets;
};