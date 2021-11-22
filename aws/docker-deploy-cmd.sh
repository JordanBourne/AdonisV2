#!/bin/bash
cd /app/aws
source ./.env
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region 'us-west-2'
yarn
NODE_TLS_REJECT_UNAUTHORIZED=0 ENV_NAME=$ENV_NAME cdk deploy