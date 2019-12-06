'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // user
  const userRouter = '/api/v1/user';
  const { user: userController } = controller;
  router.post(`${userRouter}/register`, userController.register); // 注册
  router.post(`${userRouter}/login`, userController.login); // 登录
};
