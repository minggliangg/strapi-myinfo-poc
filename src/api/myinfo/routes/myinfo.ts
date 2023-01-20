export default {
  routes: [
    {
      method: 'GET',
      path: '/myinfo',
      handler: 'myinfo.trigger',
      config: {
        auth: false,
        policies: [],
        middlewares: ['api::myinfo.authorise'],
      },
    },
    {
      method: 'GET',
      path: '/myinfo/callback',
      handler: 'myinfo.callback',
      config: {
        auth: false,
        policies: [],
        middlewares: ['api::myinfo.callback'],
      },
    },
  ],
};
