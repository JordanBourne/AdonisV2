import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateOrmTableProps {
    prefix: string;
};

export const createOrmTable = (scope: cdk.Construct, props: CreateOrmTableProps) => {
    const OrmTable = new dynamodb.Table(scope, `${props.prefix}OrmTable`, {
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'ormId',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}OrmTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const movementLabelIndexName = `${props.prefix}OrmTableMovementLabelIndex`;

    OrmTable.addGlobalSecondaryIndex({
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING,
        },
        sortKey: {
            name: 'movement-label',
            type: dynamodb.AttributeType.STRING,
        },
        indexName: movementLabelIndexName,
        projectionType: dynamodb.ProjectionType.KEYS_ONLY
    })

    const labelIndexName = `${props.prefix}OrmTableLabelIndex`;

    OrmTable.addGlobalSecondaryIndex({
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING,
        },
        sortKey: {
            name: 'label',
            type: dynamodb.AttributeType.STRING,
        },
        indexName: labelIndexName,
        projectionType: dynamodb.ProjectionType.KEYS_ONLY
    })

    const OrmTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}OrmTableNameOutput`, {
        value: OrmTable.tableName
    });

    const OrmTableMovementLabelIndexNameOutputOutput = new cdk.CfnOutput(scope, `${props.prefix}OrmTableMovementLabelIndexNameOutput`, {
        value: movementLabelIndexName
    });

    const OrmTableLabelIndexNameOutputOutput = new cdk.CfnOutput(scope, `${props.prefix}OrmTableLabelIndexNameOutput`, {
        value: labelIndexName
    });

    return { OrmTable };
};