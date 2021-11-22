import * as AWS from "aws-sdk";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export function login() {
    var authenticationData = {
        Username: 'dsmith2',
        Password: 'Burgers123456!',
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var poolData = {
        UserPoolId: 'us-west-2_p8pMB1qjQ',
        ClientId: 'uvpn2enf326mn5h70e9htpmeb',
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: authenticationData.Username,
        Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-west-2';

            alert('logged in');

            const credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:6f830812-e1eb-4a4d-aece-a09a241e6435', // your identity pool id here
                Logins: {
                    [`cognito-idp.us-west-2.amazonaws.com/${poolData.UserPoolId}`]: result
                        .getIdToken()
                        .getJwtToken(),
                },
            });

            AWS.config.credentials = credentials;

            // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            credentials.refresh(error => {
                if (error) {
                    alert('err');
                    alert(error);
                } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    alert('made it');
                }
            });
        },

        newPasswordRequired: function(userAttributes, requiredAttributes) {
            alert('whatever');
            cognitoUser.completeNewPasswordChallenge('Burgers123456!', userAttributes, {
                onSuccess: () => {
                    console.log('success');
                },
                onFailure: (err) => {
                    console.log('failure');
                    alert('failure');
                    alert(err);
                }
            });
        },

        onFailure: function (err) {
            alert(err.message || JSON.stringify(err));
        },
    });
}