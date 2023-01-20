/**
 * `redirect` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // redirection on strapi side is required as I still cannot figure out why sending other redirection_uri to the
  // auth endpoint returns an error
  return async (ctx, next) => {
    if (ctx.path === "/callback") {
      const myRedirectionURL = new URL(
        "http://localhost:3001/api/myinfo/callback"
      );
      myRedirectionURL.searchParams.append("code", ctx.query.code ?? "");
      myRedirectionURL.searchParams.append("state", ctx.query.state ?? "");
      ctx.redirect(myRedirectionURL);
      return;
    }
    await next();
  };
};
