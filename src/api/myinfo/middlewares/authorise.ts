/**
 * `myinfo` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Set up the redirection to MyInfo and redirect the user to it
  return async (ctx, next) => {
    strapi.log.info("In myinfo-authorise middleware.");
    const myRedirectionURL = new URL(
      "https://sandbox.api.myinfo.gov.sg/com/v3/authorise"
    );
    myRedirectionURL.searchParams.append("attributes", "name");
    myRedirectionURL.searchParams.append("client_id", "STG2-MYINFO-DEMO-APP");
    myRedirectionURL.searchParams.append("purpose", "name");
    myRedirectionURL.searchParams.append(
      "state",
      String(Math.floor(Math.random() * 100000))
    );
    myRedirectionURL.searchParams.append(
      "redirect_uri",
      "http://localhost:3001/callback"
    );
    ctx.redirect(myRedirectionURL);
    await next();
  };
};
