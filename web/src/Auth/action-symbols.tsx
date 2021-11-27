import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export const SetCognitoUser = 'auth/set-cognito-user';
export type SetCognitoUserData = {
    username: string;
} | null;
export const SetCognitoUserAction = (cognitoUser : AmazonCognitoIdentity.CognitoUser|null) => {
    let userData : SetCognitoUserData = null;
    if (cognitoUser?.getUsername()) {
        userData = {
            username: cognitoUser.getUsername()
        };
    }
    return {
        userData,
        type: 'auth/set-cognito-user'
    };
};