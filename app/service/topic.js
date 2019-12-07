'use strict';

const Service = require('egg').Service;

/**
 * app/service/topic.js
 * created by csr
 * 2019/12/06
 */
class TopicService extends Service {
  // 新增主题
  async insertTopic({ title, complexity, releaseUser, label }) {
    const data = await this.ctx.conn.query('INSERT csr_fj_topic (title,complexity,release_user,label) VALUES (?,?,?,?);', [ title, complexity, releaseUser, label ]);
    return { topicId: data.insertId };
  }
}

module.exports = TopicService;
