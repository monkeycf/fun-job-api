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

  // 修改笔记
  async updateNote({ noteId, content }) {
    await this.ctx.conn.query('UPDATE csr_fj_topic_note SET content = ? WHERE note_id = ?;', [ content, noteId ]);
  }

  // 删除笔记
  async deleteNote({ noteId }) {
    // 状态值修改为1(删除)
    await this.ctx.conn.query('UPDATE csr_fj_topic_note SET note_status = 1 WHERE note_id = ?;', [ noteId ]);
  }

  // 查询当前主题下自己的笔记
  async selectOwnNote({ topicId, userId }) {
    const { app } = this;
    return await app.mysql.query('SELECT * FROM csr_fj_topic_note WHERE topic_id = ? AND user_id = ? AND note_status = 0;', [ topicId, userId ]);
  }
}

module.exports = NoteService;
