import { store } from '../store';
import { SetDb } from '../Sets/types';
import { SetHasUnsavedChangesActionFn, SetIsFetchedActionFn, SetHasBeenSavedActionFn } from '../Sets/action-symbols';
import { selectAllModifiedSetIds, selectSet } from '../Sets/selectors';
import { batchAndSaveSetsToDb } from '../Sets/dynamo';
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
export const completeWorkout = async () => {
    const modifiedSetIds = selectAllModifiedSetIds(store.getState());
    const modifiedSets = modifiedSetIds.map(s => selectSet(s)(store.getState()));
    await batchAndSaveSetsToDb(modifiedSets);
    for (const set of modifiedSets) {
        store.dispatch(SetHasBeenSavedActionFn(set));
    }
};