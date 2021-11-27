import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId } from '../Cognito/config';
import { SetCognitoUserAction } from '../action-symbols';

type ParametersSignup = {
    username: string;
    email: string;
    password: string;
    dispatch: any;
    history: any;
};

export const signUp = async({username, email, password, dispatch, history} : ParametersSignup) : Promise<void> => {
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
    
    const cognitoUser : AmazonCognitoIdentity.CognitoUser = await new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, [], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (!result) {
                return reject('Result is empty?');
            }
            return resolve(result.user);
        });
    });

    dispatch(SetCognitoUserAction(cognitoUser));

    history.push('/enter-confirmation-code');
};