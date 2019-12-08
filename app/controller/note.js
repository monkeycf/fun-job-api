'use strict';

const BaseController = require('../core/base_controller');

// const helper = require('../public/helper');

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
      await this.successHandler();
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
      await this.successHandler();
    } catch (e) {
      await this.errorHandler(e);
    }
  }
}

module.exports = NoteController;
