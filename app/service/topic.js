'use strict';

const Service = require('egg').Service;

/**
 * app/service/topic.js
 * created by csr
 * 2019/12/06
 */
class TopicService extends Service {
  // 新增主题
  async insertTopic({ title, complexity, releaseUser, label, url }) {
    const data = await this.ctx.conn.query('INSERT csr_fj_topic (title,complexity,release_user,label,answer_url) VALUES (?,?,?,?,?);', [ title, complexity, releaseUser, label, url ]);
    return { topicId: data.insertId };
  }

  // 查询所有主题
  async selectAllTopic() {
    const topicData = await this.app.mysql.query('SELECT * FROM csr_fj_topic');
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
    await this.ctx.conn.query('UPDATE csr_fj_topic SET browse_sum = browse_sum + 1 WHERE id = ?;', [ topicId ]);
  }

  // 根据分类查询列表
  async selectTopicByLabel(labelId) {
    const { mysql } = this.app;
    return await mysql.query('SELECT * FROM csr_fj_topic WHERE label = ?;', [ labelId ]);
  }

  // 主题搜索
  async searchTopic(key) {
    const { mysql } = this.app;
    const searchKey = `%${key}%`;
    return await mysql.query('SELECT * FROM csr_fj_topic WHERE title LIKE ?;', [ searchKey ]);
  }

  // 收藏
  async collectTopic({ userId, topicId }) {
    const { conn } = this.ctx;
    await conn.query('INSERT INTO csr_fj_topic_collect (user_id,topic_id) VALUES(?,?);', [ userId, topicId ]);
    await conn.query('UPDATE csr_fj_topic SET collect_sum = collect_sum + 1 WHERE id = ?;', [ topicId ]);
  }

  // 取消收藏
  async cancelTopic({ userId, topicId }) {
    const { conn } = this.ctx;
    await conn.query('UPDATE csr_fj_topic_collect SET collect_status = 1 WHERE user_id= ? AND topic_id = ?;', [ userId, topicId ]);
    await conn.query('UPDATE csr_fj_topic SET collect_sum = collect_sum - 1 WHERE id = ?;', [ topicId ]);
  }

  // 收藏状态
  async getCollectStatus({ userId, topicId }) {
    const counts = await this.app.mysql.query('SELECT COUNT(*) as count FROM csr_fj_topic_collect WHERE user_id = ? AND topic_id = ?;', [ userId, topicId ]);
    return counts[0].count;
  }

  // 查询用户的收藏
  async selectCollectTopic({ userId }) {
    return await this.ctx.conn.query('SELECT DISTINCT topic_id FROM csr_fj_topic_collect WHERE collect_status = 0 AND user_id = ?;', [ userId ]);
  }
}

module.exports = TopicService;
