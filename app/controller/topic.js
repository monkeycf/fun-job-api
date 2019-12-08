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

  // 根据分类查询列表
  async selectListByLabel() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      const topics = await ctx.service.topic.selectTopicByLabel(ctx.query.labelId);
      const resultData = [];
      topics.forEach(topic => {
        resultData.push(helper.toHumpObject(topic));
      });
      await this.successHandler(resultData);
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 搜索
  async search() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      const topicList = await ctx.service.topic.searchTopic(ctx.query.key);
      const result = [];
      topicList.forEach(topic => {
        result.push(helper.toHumpObject(topic));
      });
      await this.successHandler(result);
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 收藏
  async collect() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      await ctx.service.topic.collectTopic(ctx.request.body);
      await this.successHandler({ msg: 'Collection of success.' });
    } catch (e) {
      await this.errorHandler(e);
    }
  }
}

module.exports = TopicController;
