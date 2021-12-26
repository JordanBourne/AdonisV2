

import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

interface CreateProfilesTableProps {
    prefix: string;
    ProfilesTable: dynamodb.Table;
    SetsTable: dynamodb.Table;
    MovementsTable: dynamodb.Table;
    ProgramsTable: dynamodb.Table;
    ProgramRegistrationsTable: dynamodb.Table;
    OrmTable: dynamodb.Table;
};

export const createCognitoUserPool = (scope: cdk.Construct, props: CreateProfilesTableProps) => {
    const pool = new cognito.UserPool(scope, `${props.prefix}CognitoUserPool`, {
        selfSignUpEnabled: true,
        signInAliases: { username: true, email: true },
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        autoVerify: { email: true }
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


    const authenticatedRole = new iam.Role(scope, `${props.prefix}AuthenticatedRole`, {
        assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
            "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
            "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "authenticated" },
        }, "sts:AssumeRoleWithWebIdentity"),
    });

    authenticatedRole.addToPolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
            "mobileanalytics:PutEvents", // don't know if needed
            "cognito-sync:*", // don't know if needed.
            "cognito-identity:*"
        ],
        resources: ["*"],
    }));

    const authenticatedRowLevelAccess = new iam.PrincipalWithConditions(authenticatedRole, {
        conditionsKey: {
            'ForAllValues:StringEquals': {
                'dynamodb:LeadingKeys': ['${cognito-identity.amazonaws.com:sub}']
            }
        },
    });

    props.ProfilesTable.grantReadWriteData(authenticatedRowLevelAccess);
    props.SetsTable.grantReadWriteData(authenticatedRowLevelAccess);
    props.ProgramRegistrationsTable.grantReadWriteData(authenticatedRowLevelAccess);
    props.ProgramsTable.grantReadWriteData(authenticatedRowLevelAccess);
    props.MovementsTable.grantReadWriteData(authenticatedRowLevelAccess);
    props.OrmTable.grantReadWriteData(authenticatedRowLevelAccess);

    props.MovementsTable.grantReadData(authenticatedRole);
    props.ProgramsTable.grantReadData(authenticatedRole);

    const defaultPolicy = new cognito.CfnIdentityPoolRoleAttachment(scope, `${props.prefix}CognitoDefaultPolicy`, {
        identityPoolId: identityPool.ref,
        roles: {
            'authenticated': authenticatedRole.roleArn
        }
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