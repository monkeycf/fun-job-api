'use strict';

const BaseController = require('../core/base_controller');
const helper = require('../public/helper');

/**
 * app/controller/note.js
 * created by csr
 * 2019/12/08
 */
class NoteController extends BaseController {
  // 创建笔记
  async create() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      const noteId = await ctx.service.note.createNote(ctx.request.body);
      await this.successHandler({ noteId });
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 修改笔记
  async update() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      await ctx.service.note.updateNote(ctx.request.body);
      await this.successHandler({ msg: 'update succeed.' });
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 删除笔记
  async delete() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      await ctx.service.note.deleteNote(ctx.request.body);
      await this.successHandler({ msg: 'delete succeed.' });
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 查询自己当前主题下的笔记
  async select() {
    try {
      await this.beginTransaction(false);
      const { ctx } = this;
      const noteArray = await ctx.service.note.selectOwnNote(ctx.query);
      const result = [];
      noteArray.forEach(note => {
        if (note.pictures) {
          note.pictures = note.pictures.split('&&&');
        }
        result.push(helper.toHumpObject(note));
      });
      await this.successHandler(result);
    } catch (e) {
      await this.errorHandler(e);
    }
  }
}

module.exports = NoteController;
