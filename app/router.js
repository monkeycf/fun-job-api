'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // user
  const userRouter = '/api/v1/user';
  router.post(`${userRouter}/register`, controller.user.register); // 注册
};
