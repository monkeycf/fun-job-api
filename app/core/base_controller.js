'use strict';

const { Controller } = require('egg');

/**
 * app/core/base_controller.js
 * created by csr
 * 2019/12/06
 */
class BaseController extends Controller {
  successHandler(data) {
    this.ctx.body = {
      code: 1,
      data,
    };
  }

  errorHandler(msg) {
    this.ctx.body = {
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
