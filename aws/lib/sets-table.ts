import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateSetsTableProps {
    prefix: string;
};

export const createSetsTable = (scope: cdk.Construct, props: CreateSetsTableProps) => {
    const SetsTable = new dynamodb.Table(scope, `${props.prefix}SetsTable`, {
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'setId',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}SetsTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    SetsTable.addGlobalSecondaryIndex({
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'programRegistrationId',
            type: dynamodb.AttributeType.STRING
        },
        indexName: `${props.prefix}SetsTableProgramRegistrationIdIndex`,
        projectionType: dynamodb.ProjectionType.KEYS_ONLY
    });

    const setsTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}SetsTableNameOutput`, {
        value: SetsTable.tableName
    });

    return { SetsTable };
};