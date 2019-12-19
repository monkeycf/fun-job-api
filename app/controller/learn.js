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
      let result = [];
      data.forEach(item => {
        result.push(helper.toHumpObject(item));
      });
      for (let i = 0; i < 3; i++) {
        result = result.concat(result);
      }

      await this.successHandler(result);
    } catch (e) {
      console.log(e);
      await this.errorHandler(e);
    }
  }
}

module.exports = LearnController;
