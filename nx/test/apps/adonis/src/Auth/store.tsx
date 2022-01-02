import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { SetCognitoUser, SetCognitoUserData } from './action-symbols';

interface AuthState {
  userData: SetCognitoUserData
};

const initialState: AuthState = {
  userData: null
};

export default function authReducers(state = initialState, action: any) {
  switch (action.type) {
    case SetCognitoUser:
      const userData : SetCognitoUserData = action.userData; 
      return {
        ...state,
        userData
      };
    default:
      return state
  }
}