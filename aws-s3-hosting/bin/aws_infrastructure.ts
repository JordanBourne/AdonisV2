#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsInfrastructureStack } from '../lib/aws_infrastructure-stack';
import { configurations, Configuration } from './environment-configurations';
import * as _ from 'lodash';

try {
  if (!process.env.ENV_NAME) {
    throw(`Please provide an ENV_NAME parameter. Example: 'dsmith', 'jbourne'`);
  }

  const configuration = configurations.find( e => e.dev === process.env.ENV_NAME ) as Configuration;

  if (!configuration) {
    throw(`
      Could not find configuration for ENV_NAME: ${process.env.ENV_NAME}.
      ENV_NAME must be one of: ${configurations.map(e => e.dev).join(',')}
    `)
  }
  const app = new cdk.App();
  new AwsInfrastructureStack(app, _.upperFirst(`${configuration.dev}AdonisS3Hosting`), configuration);
} catch(e) {
  console.error(e);
  throw(e);
}
