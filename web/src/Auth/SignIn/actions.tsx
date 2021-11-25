import * as AWS from "aws-sdk";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId, LoginEndpoint, IdentityPoolId } from '../Cognito/config';

type ParametersSignIn = {
    email: string;
    password: string;
};

export const signIn = async({email, password} : ParametersSignIn) : Promise<void> => {
    var userData = {
        Username: email,
        Pool: new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId,
            ClientId: UserPoolClientId,
        }),
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(
        new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password,
        }), {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();

            AWS.config.region = 'us-west-2';

            console.log('Logged in');

            const credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId, // your identity pool id here
                Logins: {
                    [LoginEndpoint]: result
                        .getIdToken()
                        .getJwtToken(),
                },
            });

            AWS.config.credentials = credentials;

            // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            credentials.refresh(error => {
                if (error) {
                    alert('credential refresh error. handler not implemented');
                    alert(error);
                    return;
                }
                console.log('Credentials refreshed');
            });
        },

        newPasswordRequired: function(userAttributes, requiredAttributes) {
            alert('new password required, not implemented');
            // cognitoUser.completeNewPasswordChallenge('Burgers123456!', userAttributes, {
            //     onSuccess: () => {
            //         console.log('success');
            //     },
            //     onFailure: (err) => {
            //         console.log('failure');
            //         alert('failure');
            //         alert(err);
            //     }
            // });
        },

        onFailure: function (err) {
            alert('error. handler not implemented');
            alert(err.message || JSON.stringify(err));
        },
    });
};