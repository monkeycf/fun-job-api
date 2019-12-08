'use strict';

const Service = require('egg').Service;

/**
 * app/service/note.js
 * created by csr
 * 2019/12/08
 */
class NoteService extends Service {
  // 创建note
  async createNote({ userId, topicId, content }) {
    const data = await this.ctx.conn.query('INSERT INTO csr_fj_topic_note (user_id,topic_id,content)VALUES (?,?,?);', [ userId, topicId, content ]);
    return data.insertId;
  }
}

module.exports = NoteService;
