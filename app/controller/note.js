'use strict';

const BaseController = require('../core/base_controller');

// const helper = require('../public/helper');

/**
 * app/controller/note.js
 * created by csr
 * 2019/12/08
 */
class NoteController extends BaseController {
  async create() {
    try {
      await this.beginTransaction();
      const { ctx } = this;
      const noteId = await ctx.service.note.createNote(ctx.request.body);
      await this.successHandler({ noteId });
    } catch (e) {
      console.log(e);
      await this.errorHandler(e);
    }
  }
}

module.exports = NoteController;
