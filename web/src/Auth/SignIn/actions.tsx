import * as AWS from "aws-sdk";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId, LoginEndpoint, IdentityPoolId } from '../Cognito/config';

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
            onSuccess: function (cognitoUserSession) {
                const accessToken = cognitoUserSession.getAccessToken().getJwtToken();
                AWS.config.region = 'us-west-2';
                return resolve(cognitoUserSession);
            },
    
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                return reject('new password required, not implemented');
            },
    
            onFailure: function (err) {
                return reject(err.message || JSON.stringify(err));
            },
        });
    });

    const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId, // your identity pool id here
        Logins: {
            [LoginEndpoint]: cognitoUserSession
                .getIdToken()
                .getJwtToken(),
        },
    });

    AWS.config.credentials = credentials;

    // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
    await new Promise((resolve, reject) => {
        credentials.refresh(error => {
            if (error) {
                return reject(error);
            }
            return resolve(null);
        });
    });

    store.dispatch(SetCognitoUserAction(cognitoUser));
};