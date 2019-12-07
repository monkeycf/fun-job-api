'use strict';

const BaseController = require('../core/base_controller');
const helper = require('../public/helper');

/**
 * app/controller/topic.js
 * created by csr
 * 2019/12/06
 */
class TopicController extends BaseController {
  // 新增主题
  async create() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      const { body } = ctx.request;
      const { topicId } = await ctx.service.topic.insertTopic(body);

      await this.successHandler({ topicId });
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 查询所有主题
  async selectAll() {
    try {
      await this.beginTransaction();
      const topicArray = await this.ctx.service.topic.selectAllTopic();
      const res = [];
      topicArray.forEach(topic => {
        res.push(helper.toHumpObject(topic));
      });
      await this.successHandler(res);
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 查询根据topicId
  async selectByTopicId() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      const { query } = ctx;
      const { topic: topicService } = ctx.service;

      const topicData = await topicService.selectTopicById(query);
      await topicService.insertBrowse(query);

      await this.successHandler(helper.toHumpObject(topicData));
    } catch (e) {
      await this.errorHandler(e);
    }
  }
}

module.exports = TopicController;
