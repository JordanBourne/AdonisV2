import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

interface CreateProfilesTableProps {
    prefix: string;
};

export const createProfilesTable = (scope: cdk.Construct, props: CreateProfilesTableProps) => {
    const table = new dynamodb.Table(scope, `${props.prefix}ProfilesTable`, {
        partitionKey: {
            name: 'username',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}ProfilesTable`
    });
};