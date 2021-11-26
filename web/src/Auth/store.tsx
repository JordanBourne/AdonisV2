import { SetUsername } from './actions';

interface AuthState {
  username?:string|null
};

const initialState: AuthState = {
  username: null
};

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case SetUsername:
      console.log('@@@@ GOT IT');
      const newState = {
        ...state,
        username: action.username,
      };
      console.log(newState);
      return newState;
    default:
      return state
  }
}