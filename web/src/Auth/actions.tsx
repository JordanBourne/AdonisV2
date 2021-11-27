import { store } from '../store';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId, IdentityPoolId } from './Cognito/config';

import { SetCognitoUserAction } from './action-symbols';

export const checkExistingUserSession = async () => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId,
    ClientId: UserPoolClientId,
  });
  const cognitoUser = userPool.getCurrentUser();

  console.log(`Checking if cognito user exists: ${cognitoUser !== null}`);
  console.log(cognitoUser);

  if (cognitoUser !== null) {
    const session: AmazonCognitoIdentity.CognitoUserSession = await new Promise((resolve, reject) => {
      cognitoUser.getSession(function (err: any, session: AmazonCognitoIdentity.CognitoUserSession) {
        if (err) {
          return reject(err.message || JSON.stringify(err));
        }

        return resolve(session);
      });
    });

    const sessionIsValid = session.isValid();

    console.log(`Checking if session is valid: ${sessionIsValid}`);

    if (sessionIsValid) {
      store.dispatch(SetCognitoUserAction(cognitoUser));
    }
  }
};

export const logOut = async () => {
  var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId,
    ClientId: UserPoolClientId,
  });
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser !== null) {
    cognitoUser.signOut();
    store.dispatch(SetCognitoUserAction(null));
  }
};