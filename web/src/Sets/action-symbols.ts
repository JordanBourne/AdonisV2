import { SetDb } from './types';
export const SetIsFetched = 'Set/SetIsFetched';

export const SetIsFetchedActionFn = (set: SetDb) => ({ type: SetIsFetched, set });