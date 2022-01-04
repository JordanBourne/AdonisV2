import { SetIsFetchedActionFn, SetHasUnsavedChangesActionFn } from './action-symbols';
import { batchAndSaveSetsToDb } from './dynamo';
import { SetDb } from './types';
import { store } from '../store';
export const toggleSetCompletion = async (set:SetDb) => {
    if (set.repsCompleted === null) {
        set.repsCompleted = set.repsExpected;
    } else {
        set.repsCompleted = null;
    }
    store.dispatch(
        SetIsFetchedActionFn(set)
    );
    store.dispatch(
        SetHasUnsavedChangesActionFn(set)
    );
    await batchAndSaveSetsToDb([ set ]);
};
