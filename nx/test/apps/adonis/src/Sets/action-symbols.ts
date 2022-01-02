import { SetDb } from './types';
export const SetIsFetched = 'Set/SetIsFetched';
export const SetIsFetchedActionFn = (set: SetDb) => ({ type: SetIsFetched, set });

export const AddRep = 'Set/AddRep';
export const AddRepActionFn = (set: SetDb) => ({ type: AddRep, set });

export const MinusRep = 'Set/MinusRep';
export const MinusRepActionFn = (set: SetDb) => ({ type: MinusRep, set });

export const SetHasUnsavedChanges = 'Set/HasUnsavedChanges';
export const SetHasUnsavedChangesActionFn = (set: SetDb) => ({ type: SetHasUnsavedChanges, set });

export const RememberWeightLiftedForSet = 'Set/RememberWeightLifted';
export const RememberWeightLiftedForSetActionFn = (set: SetDb) => ({ type: RememberWeightLiftedForSet, set });