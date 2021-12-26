import { SetIsFetchedActionFn, SetHasUnsavedChangesActionFn } from './action-symbols';
import { SetDb } from './types';
import { store } from '../store';
export const setCompleted = (set:SetDb) => {
    set.repsCompleted = set.repsExpected;
    store.dispatch(
        SetIsFetchedActionFn(set)
    );
    store.dispatch(
        SetHasUnsavedChangesActionFn(set)
    );
};
