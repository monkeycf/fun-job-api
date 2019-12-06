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

  // 下划线转换驼峰
  toHump(line) {
    return line.replace(/\_(\w)/g, (a, l) => l.toUpperCase());
  }

  // 驼峰转下划线
  toLine(hump) {
    return hump.replace(/([A-Z]|\d)/g, (a, l) => `_${l.toLowerCase()}`);
  }

  toHumpObject(obj) {
    const newObj = {};
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        newObj[this.toHump(k)] = obj[k];
      }
    }
    obj = null;
    return newObj;
  }

  toLineObject(obj) {
    const newObj = {};
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        newObj[this.toLine(k)] = obj[k];
      }
    }
    obj = null;
    return newObj;
  }
}

module.exports = BaseController;
