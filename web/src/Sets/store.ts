import { SetIsFetched, RememberWeightLiftedForSet } from './action-symbols';
import { SetDb } from './types';

interface MySetsState {
  [key: string]: SetDb
};

const initialState: MySetsState = {};

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case SetIsFetched:
      return {
        ...state,
        [action.set.setId]: action.set
      };
    case RememberWeightLiftedForSet:
      return {
        ...state,
        [action.set.setId]: action.set
      };
    default:
      return state
  }
}