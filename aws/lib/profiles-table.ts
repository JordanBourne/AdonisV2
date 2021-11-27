import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as iam from '@aws-cdk/aws-iam';

interface CreateProfilesTableProps {
    prefix: string;
};

export const createProfilesTable = (scope: cdk.Construct, props: CreateProfilesTableProps) => {
    const ProfilesTable = new dynamodb.Table(scope, `${props.prefix}ProfilesTable`, {
        partitionKey: {
            name: 'username',
            type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        tableName: `${props.prefix}ProfilesTable`,
        removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const profilesTableNameOutput = new cdk.CfnOutput(scope, `${props.prefix}ProfilesTableNameOutput`, {
        value: ProfilesTable.tableName
    });

    return { ProfilesTable };
};