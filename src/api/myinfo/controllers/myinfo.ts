/**
 * A set of functions called "actions" for `myinfo`
 */

export default {
  trigger: async (ctx, next) => {
    try {
      ctx.body = 'trigger';
    } catch (err) {
      ctx.body = err;
    }
  },
  callback: async (ctx, next) => {
    try {
      ctx.body = 'callback';
    } catch (err) {
      ctx.body = err;
    }
  },
};
