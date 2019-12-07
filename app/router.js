'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const v1Router = '/api/v1';
  // user
  const userRouter = `${v1Router}/user`;
  const { user: userController } = controller;
  router.post(`${userRouter}/register`, userController.register); // 注册
  router.post(`${userRouter}/login`, userController.login); // 登录

  // topic
  const topicRouter = `${v1Router}/topic`;
  const { topic: topicController } = controller;
  router.post(`${topicRouter}/create`, topicController.create); // 新增主题
  router.get(`${topicRouter}/select/all`, topicController.selectAll); // 查询所有主题
  router.get(`${topicRouter}/select/topicId`, topicController.selectByTopicId); // 根据id查询主题
};
