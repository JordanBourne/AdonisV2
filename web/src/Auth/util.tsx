import { IdentityPoolId, UserPoolId, UserPoolClientId, LoginEndpoint } from "./Cognito/config";
import { fromCognitoIdentity, CognitoIdentityCredentialProvider } from "@aws-sdk/credential-providers";
import { awsAccountId } from '../config';

import { CognitoIdentityClient, GetIdCommand } from "@aws-sdk/client-cognito-identity";

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export const getCognitoUserSession = async (): Promise<AmazonCognitoIdentity.CognitoUserSession | null> => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId,
    ClientId: UserPoolClientId,
  });
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser === null) {
    return null;
  }

  const cognitoUserSession: AmazonCognitoIdentity.CognitoUserSession = await new Promise((resolve, reject) => {
    cognitoUser.getSession(function (err: any, session: AmazonCognitoIdentity.CognitoUserSession) {
      if (err) {
        return reject(err.message || JSON.stringify(err));
      }

      return resolve(session);
    });
  });

  const sessionIsValid = cognitoUserSession.isValid();

  console.log(`Checking if session is valid: ${sessionIsValid}`);

  if (sessionIsValid) {
    return cognitoUserSession;
  }
  return null;
};

export const getCognitoIdentityCredentials = async (): Promise<CognitoIdentityCredentialProvider | null> => {
  const cognitoUserSession = await getCognitoUserSession();
  if (cognitoUserSession === null) {
    return null;
  }


  const cognitoIdentityClient = new CognitoIdentityClient({
    region: 'us-west-2'
  });

  const command = new GetIdCommand({
    AccountId: awsAccountId,
    IdentityPoolId: IdentityPoolId,
    Logins: {
      [LoginEndpoint]: cognitoUserSession.getIdToken().getJwtToken()
    },
  });

  const { IdentityId } = await cognitoIdentityClient.send(command);

  if (!IdentityId) {
    throw new Error('Could not obtain identity id');
  }

  // Calling this function might refresh the credentials
  const credentials = fromCognitoIdentity({
    identityId: IdentityId,
    logins: {
      [LoginEndpoint]: cognitoUserSession.getIdToken().getJwtToken()
    },
    clientConfig: {
      region: 'us-west-2'
    }
  });

  return credentials;
};