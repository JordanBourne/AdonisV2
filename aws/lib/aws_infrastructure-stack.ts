import * as cdk from '@aws-cdk/core';

import { createProfilesTable } from './profiles-table';
import { createCognitoUserPool } from './cognito-user-pool';
import { Configuration } from '../bin/environment-configurations';

export class AwsInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Configuration) {
    super(scope, id, props);

    createProfilesTable(this, props);
    createCognitoUserPool(this, props);
  }
}
