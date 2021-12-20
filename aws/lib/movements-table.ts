import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateMovementsTableProps {
    prefix: string;
};

export const createMovementsTable = (scope: cdk.Construct, props: CreateMovementsTableProps) => {
    const MovementsTable = new dynamodb.Table(scope, `${props.prefix}MovementsTable`, {
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'movementId',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}MovementsTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const MovementsTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}MovementsTableNameOutput`, {
        value: MovementsTable.tableName
    });

    return { MovementsTable };
};