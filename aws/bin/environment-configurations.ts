import { StackProps } from "@aws-cdk/core";

export interface Configuration extends StackProps {
    dev: string;
    prefix: string;
    env: {
        account: string;
        region: string;
    }
};

export const configurations : Configuration[] = [{
    dev: 'dsmith',
    prefix: 'Dsmith',
    env: {
        account: '295909865373',
        region: 'us-west-2'
    }
}];