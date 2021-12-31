import * as cdk from '@aws-cdk/core';

import { createProfilesTable } from './profiles-table';
import { createSetsTable } from './sets-table';
import { createCognitoUserPool } from './cognito-user-pool';
import { Configuration } from '../bin/environment-configurations';
import { createMovementsTable } from './movements-table';
import { createProgramsTable } from './programs-table';
import { createProgramRegistrationsTable } from './program-registrations-table';
import { createAutoregulationSchemesTable } from './autoregulation-schemes-table';
import { createOrmTable } from './orm-table';

export class AwsInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Configuration) {
    super(scope, id, props);

    const { ProfilesTable } = createProfilesTable(this, props);
    const { SetsTable } = createSetsTable(this, props);
    const { MovementsTable } = createMovementsTable(this, props);
    const { ProgramsTable } = createProgramsTable(this, props);
    const { ProgramRegistrationsTable } = createProgramRegistrationsTable(this, props);
    const { OrmTable } = createOrmTable(this, props);
    const { AutoregulationSchemesTable } = createAutoregulationSchemesTable(this, props);
    createCognitoUserPool(this, {
      ...props,
      ProfilesTable,
      SetsTable,
      MovementsTable,
      ProgramsTable,
      ProgramRegistrationsTable,
      OrmTable,
      AutoregulationSchemesTable,
    });
  }
}
