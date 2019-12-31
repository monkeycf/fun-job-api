'use strict';

const BaseController = require('../core/base_controller');
const helper = require('../public/helper');

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
      await user.countPhone(body); // 判断手机号是否已注册
      await user.createUser(body); // 注册用户
      const { id: userId } = await user.queryUserIdByPhone(body); // 查询userId

      await this.successHandler({ userId });
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 用户登录
  async login() {
    try {
      const { ctx } = this;
      const { body } = ctx.request;
      const { user } = ctx.service;

      await this.beginTransaction();
      const userInfo = await user.loginByPassword(body); // 密码登录

      await this.successHandler(helper.toHumpObject(userInfo));
    } catch (e) {
      await this.errorHandler(e);
    }
  }

  // 查询用户信息
  async selectInfo() {
    try {
      await this.beginTransaction(false);
      const { ctx } = this;
      const userInfo = await ctx.service.user.selectUserInfo(ctx.query);
      await this.successHandler(helper.toHumpObject({ ...userInfo }));
    } catch (e) {
      await this.errorHandler(e);
    }
  }
}

module.exports = UserController;
