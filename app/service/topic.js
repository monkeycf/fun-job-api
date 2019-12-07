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

  // 查询所有主题
  async selectAllTopic() {
    const topicData = await this.ctx.conn.query('SELECT * FROM csr_fj_topic');
    return [ ...topicData ];
  }

  // 根据topicId查询
  async selectTopicById({ topicId }) {
    const topicData = await this.ctx.conn.query('SELECT * FROM csr_fj_topic WHERE id = ?;', [ topicId ]);
    return topicData[0];
  }

  // 新增浏览记录
  async insertBrowse({ topicId, userId }) {
    await this.ctx.conn.query('INSERT csr_fj_topic_browse (topic_id,user_id) VALUES(?,?);', [ topicId, userId ]);
    await this.updateTopicBrowseCount(topicId);
  }

  // 主题浏览次数累加
  async updateTopicBrowseCount(topicId) {
    const { conn } = this.ctx;
    const countArray = await conn.query('SELECT browse_sum as count FROM csr_fj_topic WHERE id = ?;', [ topicId ]);
    await conn.query('UPDATE csr_fj_topic SET browse_sum = ?  WHERE id = ?;', [ countArray[0].count + 1, topicId ]);
  }
}

module.exports = TopicService;
