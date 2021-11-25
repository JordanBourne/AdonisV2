interface AuthState {
  username?:string|null
};

const initialState: AuthState = {
  username: null
};

export default function profileReducers(state = initialState, action: any) {
  switch (action.type) {
    case 'profile/set-user':
      return {
        ...state
      };
    default:
      return state
  }
}