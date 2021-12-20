import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateProgramRegistrationsTableProps {
    prefix: string;
};

export const createProgramRegistrationsTable = (scope: cdk.Construct, props: CreateProgramRegistrationsTableProps) => {
    const ProgramRegistrationsTable = new dynamodb.Table(scope, `${props.prefix}ProgramRegistrationsTable`, {
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'programRegistrationId',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}ProgramRegistrationsTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const ProgramRegistrationsTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}ProgramRegistrationsTableNameOutput`, {
        value: ProgramRegistrationsTable.tableName
    });

    return { ProgramRegistrationsTable };
};