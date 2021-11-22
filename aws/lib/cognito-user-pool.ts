

import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';

const fs = require('fs');
const path = require('path');

interface CreateProfilesTableProps {
    prefix: string;
};

export const createCognitoUserPool = (scope: cdk.Construct, props: CreateProfilesTableProps) => {
    const pool = new cognito.UserPool(scope, `${props.prefix}CognitoUserPool`);
    const userPoolClient = new cognito.UserPoolClient(scope, `${props.prefix}CognitoUserPoolClient`, {
        userPool: pool,
        generateSecret: true,
        authFlows: {
            userPassword: true,
        },
    });
    const poolIdOutput = new cdk.CfnOutput(scope, `${props.prefix}CognitoUserPoolIdOutput`, {
        value: pool.userPoolId
    });
    const clientIdOutput = new cdk.CfnOutput(scope, `${props.prefix}CognitoUserPoolClientIdOutput`, {
        value: userPoolClient.userPoolClientId
    });

    const shared = {
        userPoolId: pool.userPoolId,
        userPoolClientId: userPoolClient.userPoolClientId
    };

    fs.writeFileSync(path.join(__dirname, '../../shared/cognito-exports.js'), `module.exports=${JSON.stringify(shared)}`);
};