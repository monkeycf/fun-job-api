'use strict';

const { Controller } = require('egg');

/**
 * app/core/base_controller.js
 * created by csr
 * 2019/12/06
 */
class BaseController extends Controller {
  async beginTransaction() {
    this.ctx.conn = await this.app.mysql.beginTransaction();
  }

  async successHandler(data) {
    const { ctx } = this;
    await ctx.conn.commit();
    ctx.body = {
      code: 1,
      data,
    };
  }

  async errorHandler(msg) {
    const { ctx } = this;
    await ctx.conn.rollback();
    ctx.body = {
      code: -1,
      msg,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
