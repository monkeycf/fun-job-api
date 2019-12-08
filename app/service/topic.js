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
    await this.ctx.conn.query('UPDATE csr_fj_topic SET browse_sum = browse_sum + 1 WHERE id = ?;', [ topicId ]);
  }

  // 根据分类查询列表
  async selectTopicByLabel(labelId) {
    const topicArray = await this.ctx.conn.query('SELECT * FROM csr_fj_topic WHERE label = ?;', [ labelId ]);
    return [ ...topicArray ];
  }

  // 主题搜索
  async searchTopic(key) {
    const searchKey = `%${key}%`;
    const topicArray = await this.ctx.conn.query('SELECT * FROM csr_fj_topic WHERE title LIKE ?;', [ searchKey ]);
    return [ ...topicArray ];
  }
}

module.exports = TopicService;
