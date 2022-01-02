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
            onSuccess: (cognitoUserSession) => {
                console.log("Auth success");
                resolve(cognitoUserSession)
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                console.log('new password');
                reject('new password required, not implemented')
            },
            onFailure: (err) => {
                console.log('failure');
                console.log(err);
                reject(err.message || JSON.stringify(err))
            }
        });
    });

    store.dispatch(SetCognitoUserAction(cognitoUser));
};