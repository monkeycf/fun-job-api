'use strict';

const BaseController = require('../core/base_controller');
const helper = require('../public/helper');

/**
 * app/controller/learn.js
 * created by csr
 * 2019/12/16
 */
class LearnController extends BaseController {
  async getModules() {
    try {
      await this.beginTransaction(false);
      const { ctx } = this;
      const data = await ctx.service.learn.searchModules();

      const { index = 0 } = ctx.query;
      const result = [];
      data.forEach(item => {
        item.title += index;
        result.push(helper.toHumpObject(item));
      });

      await this.successHandler(result);
    } catch (e) {
      console.log(e);
      await this.errorHandler(e);
    }
  }
}

module.exports = LearnController;
