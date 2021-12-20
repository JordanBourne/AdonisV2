import { SetIsFetched } from './action-symbols';
import { SetDb } from './types';

interface MySetsState{
    [key: string]: SetDb
};

const initialState : MySetsState = { };

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case SetIsFetched:
      return {
        ...state,
        [action.set.sortKey]: action.set
      };
    default:
      return state
  }
}