import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId } from '../Cognito/config';

import { SetCognitoUserAction } from '../action-symbols';

import { store } from '../../store';

type ParametersSignIn = {
    username: string;
    password: string;
};

export const signIn = async({username, password} : ParametersSignIn) : Promise<void> => {
    const userData = {
        Username: username,
        Pool: new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId,
            ClientId: UserPoolClientId,
        }),
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const cognitoUserSession : AmazonCognitoIdentity.CognitoUserSession = await new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(
            new AmazonCognitoIdentity.AuthenticationDetails({
                Username: username,
                Password: password,
            }), {
            onSuccess: (cognitoUserSession) => resolve(cognitoUserSession),
            newPasswordRequired: (userAttributes, requiredAttributes) => reject('new password required, not implemented'),
            onFailure: (err) => reject(err.message || JSON.stringify(err))
        });
    });

    store.dispatch(SetCognitoUserAction(cognitoUser));
};