'use strict';

const { Controller } = require('egg');

/**
 * app/core/base_controller.js
 * created by csr
 * 2019/12/06
 */
class BaseController extends Controller {
  async beginTransaction(flag = true) {
    if (flag) {
      this.ctx.conn = await this.app.mysql.beginTransaction();
    }
    this.ctx.connFlag = flag;
  }

  async successHandler(data) {
    const { ctx } = this;
    if (ctx.connFlag) {
      await ctx.conn.commit();
    }
    ctx.body = {
      code: 1,
      data,
      msg: '',
    };
  }

  async errorHandler(msg) {
    const { ctx } = this;
    if (ctx.connFlag) {
      await ctx.conn.rollback();
    }
    ctx.body = {
      code: -1,
      data: {},
      msg,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
