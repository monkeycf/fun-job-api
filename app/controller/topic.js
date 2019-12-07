'use strict';

const BaseController = require('../core/base_controller');

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
}

module.exports = TopicController;
