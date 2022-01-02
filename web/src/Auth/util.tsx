import { IdentityPoolId, UserPoolId, UserPoolClientId, LoginEndpoint } from "./Cognito/config";
import { fromCognitoIdentity, CognitoIdentityCredentialProvider } from "@aws-sdk/credential-providers";
import { awsAccountId } from '../config';

import { CognitoIdentityClient, GetIdCommand } from "@aws-sdk/client-cognito-identity";

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export const getCredentialsAndId = async () => {
  const cognitoUserSession = await getCognitoUserSession();
  if (cognitoUserSession === null) {
    return null;
  }
  const cognitoIdentityId = await getCognitoIdentityId(cognitoUserSession);
  const cognitoIdentityCredentials = await getCognitoIdentityCredentials();
  if (cognitoIdentityCredentials === null) {
    return null;
  }
  return { cognitoIdentityId, cognitoIdentityCredentials };
};

export const getCognitoUserSession = async (): Promise<AmazonCognitoIdentity.CognitoUserSession | null> => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId,
    ClientId: UserPoolClientId,
  });
  console.log('get current user');
  const cognitoUser = userPool.getCurrentUser();
  console.log('got user');

  if (cognitoUser === null) {
    return null;
  }

  console.log('get session starting');
  const cognitoUserSession: AmazonCognitoIdentity.CognitoUserSession = await new Promise((resolve, reject) => {
    console.log('getting session');
    cognitoUser.getSession(function (err: any, session: AmazonCognitoIdentity.CognitoUserSession) {
      if (err) {
        console.error(err);
        return reject(err.message || JSON.stringify(err));
      }

      console.log('got session');
      return resolve(session);
    });
  });

  const sessionIsValid = cognitoUserSession.isValid();

  if (sessionIsValid) {
    return cognitoUserSession;
  }
  return null;
};

export const getCognitoIdentityId = async (cognitoUserSession: AmazonCognitoIdentity.CognitoUserSession): Promise<string | null> => {
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

  console.log('getting id');
  const { IdentityId } = await cognitoIdentityClient.send(command);
  console.log('got id');

  if (!IdentityId) {
    throw new Error('Could not obtain identity id');
  }

  return IdentityId;
};

export const getCognitoIdentityCredentials = async (): Promise<CognitoIdentityCredentialProvider | null> => {
  const cognitoUserSession = await getCognitoUserSession();
  if (cognitoUserSession === null) {
    return null;
  }

  const IdentityId = await(getCognitoIdentityId(cognitoUserSession));
  if (IdentityId === null) {
    return null;
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