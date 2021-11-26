import * as AWS from "aws-sdk";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { UserPoolId, UserPoolClientId } from '../Cognito/config';

type ConfirmRegistrationProps = {
  username: string;
  confirmationCode: string;
};

export const confirmRegistration = async ({ username, confirmationCode } : ConfirmRegistrationProps) => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId,
      ClientId: UserPoolClientId,
    }),
  });
  await new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
      if (err) {
        return reject(err.message || JSON.stringify(err));
      }
      return resolve(null);
    });
  });
};