'use strict';

const BaseController = require('../core/base_controller');

/**
 * app/controller/user.js
 * created by csr
 * 2019/12/06
 */
class UserController extends BaseController {
  // 用户注册
  async register() {
    try {
      const { ctx } = this;
      const { body } = ctx.request;
      const { user } = ctx.service;

      await this.beginTransaction();
      await user.countPhone(body);
      await user.createUser(body);
      const { id: userId } = await user.queryUserIdByPhone(body);

      await this.successHandler({ userId });
    } catch (e) {
      await this.errorHandler(e);
    }
  }
}

module.exports = UserController;
