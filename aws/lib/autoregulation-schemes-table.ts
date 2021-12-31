import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateAutoregulationSchemesTableProps {
    prefix: string;
};

export const createAutoregulationSchemesTable = (scope: cdk.Construct, props: CreateAutoregulationSchemesTableProps) => {
    const AutoregulationSchemesTable = new dynamodb.Table(scope, `${props.prefix}AutoregulationSchemesTable`, {
        partitionKey: {
            name: 'cognitoIdentityId',
            type: dynamodb.AttributeType.STRING
        },
        sortKey: {
            name: 'autoregulationSchemeId',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}AutoregulationSchemesTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const indexName = `${props.prefix}AutoregulationSchemesAutoregulationSchemeIdIndex`;

    AutoregulationSchemesTable.addGlobalSecondaryIndex({
        partitionKey: {
            name: 'autoregulationSchemeId',
            type: dynamodb.AttributeType.STRING
        },
        indexName,
    });

    const AutoregulationSchemesTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}AutoregulationSchemesTableNameOutput`, {
        value: AutoregulationSchemesTable.tableName
    });

    const AutoregulationSchemesAutoregulationSchemeIdIndexOutput = new cdk.CfnOutput(scope, `${props.prefix}AutoregulationSchemesAutoregulationSchemeIdIndexOutput`, {
        value: indexName
    });

    return { AutoregulationSchemesTable };
};