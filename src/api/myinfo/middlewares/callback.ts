/**
 * `myinfo` middleware
 */

import { Strapi } from '@strapi/strapi';

import MyInfoConnector from 'myinfo-connector-nodejs'; //Call constructor to initialize library and pass in the configurations.

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In myinfo-callback middleware.');

    // The credentials, secrets, etc are all copied from the sample MyInfo app
    let connector = new MyInfoConnector({
      CLIENT_ID: 'STG2-MYINFO-DEMO-APP', //Client id provided during onboarding
      CLIENT_SECRET: 'outzuu7n3bxzcvdyrv98y3picshnkydf1r4ybwas', //Client secret provided during onboarding
      REDIRECT_URL: 'http://localhost:3001/callback', //Redirect URL for web application
      ATTRIBUTES: 'name',
      MYINFO_SIGNATURE_CERT_PUBLIC_CERT:
        './cert/staging-myinfo-public-cert.pem',
      CLIENT_SECURE_CERT: './cert/your-sample-app-certificate.p12', //Alias of the application private key in P12 format.
      CLIENT_SECURE_CERT_PASSPHRASE: 'DemoApp', //Password of the private key.
      ENVIRONMENT: 'SANDBOX',
      TOKEN_URL: 'https://sandbox.api.myinfo.gov.sg/com/v3/token',
      PERSON_URL: 'https://sandbox.api.myinfo.gov.sg/com/v3/person',
      USE_PROXY: 'N', //Indicate whether proxy url is used. i.e. Y or N
      PROXY_TOKEN_URL: '', //Configure your proxy url here, if any.
      PROXY_PERSON_URL: '', //Configure your proxy url here, if any.
      DEBUG_LEVEL: 'log',
    });
    // Using MyInfoConnector to convert the auth code to an auth token and the token to obtain the user info
    connector
      .getMyInfoPersonData(
        ctx.query.code,
        ctx.query.state,
        String(Math.floor(Math.random() * 100000))
      )
      .then((data) => {
        // Notice only the name of the user is returned.
        strapi.log.info(data.name.value);
        strapi.log.info(data.dob?.value ?? 'There is no DOB');
        return data; // Person Data
      })
      .catch((error) => {
        throw error;
      });
    await next();
  };
};
