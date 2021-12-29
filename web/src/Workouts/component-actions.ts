import { useSelector } from 'react-redux';
import { selectSetsForDay } from '../Sets/selectors';
import { selectNextDay, selectProgramRegistration } from '../ProgramRegistrations/selectors';
import { store } from '../store';
import { SetDb } from '../Sets/types';
import { SetHasUnsavedChangesActionFn, SetIsFetchedActionFn } from '../Sets/action-symbols';
import { selectAllModifiedSetIds, selectSet } from '../Sets/selectors';
import { batchAndSaveSetsToDb } from '../Sets/dynamo';
import { selectMyProfile } from '../Profile/selectors';
import { setMyProfile } from '../Profile/actions';
import { ProfileDb } from '../Profile/types';
export const addRep = (set? : SetDb) => {
    if (!set) return;
    if (!set.repsCompleted) {
        set.repsCompleted = set.repsExpected;
    }
    set.repsCompleted++;
    store.dispatch(SetIsFetchedActionFn(set));
    store.dispatch(SetHasUnsavedChangesActionFn(set));
};
export const minusRep = (set? : SetDb) => {
    if (!set) return;
    if (!set.repsCompleted) {
        set.repsCompleted = set.repsExpected;
    }
    set.repsCompleted--;
    store.dispatch(SetIsFetchedActionFn(set));
    store.dispatch(SetHasUnsavedChangesActionFn(set));
};
export const completeWorkout = async (week: number, day: number) => {
    const profile = selectMyProfile(store.getState());
    const sets = selectSetsForDay({ week, day, programRegistrationId: profile?.programRegistrationId as string })(store.getState());
    await batchAndSaveSetsToDb(sets);
    const { week: nextWeek, day: nextDay } = selectNextDay(profile?.programRegistrationId as string, profile?.week as number, profile?.day as number )(store.getState());
    await setMyProfile({
        ...profile,
        week: nextWeek ? nextWeek : null,
        day: nextDay ? nextDay : null,
    } as ProfileDb);
};