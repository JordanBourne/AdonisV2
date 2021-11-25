import * as AWS from "aws-sdk";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId } from '../Cognito/config';

type ParametersSignup = {
    username: string;
    email: string;
    password: string;
};

export const signUp = async({username, email, password} : ParametersSignup) : Promise<void> => {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId,
        ClientId: UserPoolClientId
    });
    
    const attributeList = [
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: email,
        })
    ];
    
    await new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, [], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (!result) {
                return reject('Result is empty?');
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            return resolve(null);
        });
    });
};