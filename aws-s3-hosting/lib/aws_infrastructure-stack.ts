import * as cdk from '@aws-cdk/core';
import { Configuration } from '../bin/environment-configurations';

import * as path from 'path';
import * as route53 from '@aws-cdk/aws-route53';
import * as s3 from '@aws-cdk/aws-s3';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';

import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as cloudfrontOrigins from '@aws-cdk/aws-cloudfront-origins';
import * as s3deployment from '@aws-cdk/aws-s3-deployment';

export class AwsInfrastructureStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: Configuration) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, `${props.prefix}Bucket`, {
            websiteErrorDocument: '404.html',
            websiteIndexDocument: 'index.html',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            cors: [{
                allowedOrigins: ['*'],
                allowedMethods: [
                    s3.HttpMethods.GET,
                    s3.HttpMethods.HEAD
                ]
            }],
            websiteRoutingRules: [{
                condition: {
                    httpErrorCodeReturnedEquals: '404',
                },
                hostName: 'dr6qu5zp0io1y.cloudfront.net',
                protocol: s3.RedirectProtocol.HTTP,
                replaceKey: s3.ReplaceKey.prefixWith('#!/'),
            }]
        });

        // const siteCertificate = certificatemanager.Certificate.fromCertificateArn(this, 'site-cert', props.certificateArn)

        const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, `${props.prefix}OriginAccessIdentity`, {

        });

        const cloudfrontDistribution = new cloudfront.CloudFrontWebDistribution(this, `${props.prefix}CloudfrontDistribution`, {
            defaultRootObject: 'index.html',
            originConfigs: [{
                s3OriginSource: {
                    s3BucketSource: bucket,
                    originAccessIdentity
                },
                behaviors: [{
                    isDefaultBehavior: true,
                    allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
                }],
            }],
            // viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
            //     siteCertificate,
            //     {
            //         aliases: [props.domain],
            //         securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
            //         sslMethod: cloudfront.SSLMethod.SNI
            //     }
            // ),
        });

        bucket.grantRead(originAccessIdentity);

        // const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
        //     this,
        //     `${props.prefix}HostedZone`,
        //     {
        //         zoneName: props.hostedZoneName,
        //         hostedZoneId: props.hostedZoneId,
        //     }
        // );

        const cloudfrontTarget = new route53Targets.CloudFrontTarget(cloudfrontDistribution);

        // new route53.ARecord(this, `${props.prefix}ARecord`, {
        //     recordName: props.domain,
        //     zone: hostedZone,
        //     target: route53.RecordTarget.fromAlias(cloudfrontTarget)
        // });

        // new route53.AaaaRecord(this, `${props.prefix}AaaaRecord`, {
        //     recordName: props.domain,
        //     zone: hostedZone,
        //     target: route53.RecordTarget.fromAlias(cloudfrontTarget)
        // });

        new s3deployment.BucketDeployment(this, `${props.prefix}S3Deployment`, {
            sources: [s3deployment.Source.asset(path.join(__dirname, '../../web/build'))],
            destinationBucket: bucket,
            retainOnDelete: false
        });

        const output = new cdk.CfnOutput(this, `${props.prefix}CloudFrontUrlOutput`, {
            value: cloudfrontDistribution.distributionDomainName
        });
    };


}
