

import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';

const fs = require('fs');
const path = require('path');

interface CreateProfilesTableProps {
    prefix: string;
};

export const createCognitoUserPool = (scope: cdk.Construct, props: CreateProfilesTableProps) => {
    const pool = new cognito.UserPool(scope, `${props.prefix}CognitoUserPool`, {
        selfSignUpEnabled: true,
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY
    });
    const userPoolClient = new cognito.UserPoolClient(scope, `${props.prefix}CognitoUserPoolClient`, {
        userPool: pool,
        authFlows: {
            userPassword: true,
            userSrp: true
        },
    });

    const identityPool = new cognito.CfnIdentityPool(scope, `${props.prefix}CognitoIdentityPool`, {
        allowClassicFlow: true,
        allowUnauthenticatedIdentities: false,
        cognitoIdentityProviders: [
            {
                clientId: userPoolClient.userPoolClientId,
                providerName: pool.userPoolProviderName,
            }
        ],
        identityPoolName: `${props.prefix}CognitoIdentityPool`,
        developerProviderName: `${props.prefix}CognitoIdentityPool`,
    });

    const poolIdOutput = new cdk.CfnOutput(scope, `${props.prefix}CognitoUserPoolIdOutput`, {
        value: pool.userPoolId
    });

    const clientIdOutput = new cdk.CfnOutput(scope, `${props.prefix}CognitoUserPoolClientIdOutput`, {
        value: userPoolClient.userPoolClientId
    });

    const identityPoolOutput = new cdk.CfnOutput(scope, `${props.prefix}CognitoIdentityPoolOutput`, {
        value: identityPool.ref
    });
};