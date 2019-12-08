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
  router.get(`${topicRouter}/select/label`, topicController.selectListByLabel); // 根据分类查询
  router.get(`${topicRouter}/search`, topicController.search); // 主题搜索
  router.post(`${topicRouter}/collect`, topicController.collect); // 主题收藏
  router.post(`${topicRouter}/cancel/collection`, topicController.cancelCollection); // 主题取消收藏

  // note
  const noteRouter = `${v1Router}/note`;
  const { note: noteController } = controller;
  router.post(`${noteRouter}/create`, noteController.create); // 新增笔记
};
