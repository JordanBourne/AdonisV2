import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateProgramsTableProps {
    prefix: string;
};

export const createProgramsTable = (scope: cdk.Construct, props: CreateProgramsTableProps) => {
    const ProgramsTable = new dynamodb.Table(scope, `${props.prefix}ProgramsTable`, {
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'programId',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}ProgramsTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const ProgramsTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}ProgramsTableNameOutput`, {
        value: ProgramsTable.tableName
    });

    return { ProgramsTable };
};