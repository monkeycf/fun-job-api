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
  router.get(`${userRouter}/info`, userController.selectInfo);// 查询用户信息

  // topic
  const topicRouter = `${v1Router}/topic`;
  const { topic: topicController } = controller;
  router.post(`${topicRouter}/create`, topicController.create); // 新增主题
  router.get(`${topicRouter}/select/all`, topicController.selectAll); // 查询所有主题
  router.get(`${topicRouter}/select/topicId`, topicController.selectByTopicId); // 根据id查询主题
  router.get(`${topicRouter}/select/label`, topicController.selectListByLabel); // 根据分类查询
  router.get(`${topicRouter}/search`, topicController.search); // 主题搜索
  router.get(`${topicRouter}/collect/status`, topicController.collectStatus); // 收藏状态
  router.post(`${topicRouter}/collect`, topicController.collect); // 主题收藏
  router.post(`${topicRouter}/cancel/collection`, topicController.cancelCollection); // 主题取消收藏

  // note
  const noteRouter = `${v1Router}/note`;
  const { note: noteController } = controller;
  router.post(`${noteRouter}/create`, noteController.create); // 新增笔记
  router.post(`${noteRouter}/update`, noteController.update); // 修改笔记
  router.post(`${noteRouter}/delete`, noteController.delete); // 删除笔记
  router.get(`${noteRouter}/select`, noteController.select); // 查询当前笔记

  // learn
  const learnRouter = `${v1Router}/learn`;
  const { learn: learnController } = controller;
  router.get(`${learnRouter}/get/modules`, learnController.getModules); // 获取模块
};
