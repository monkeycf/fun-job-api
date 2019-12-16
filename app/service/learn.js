'use strict';

const Service = require('egg').Service;

/**
 * app/service/learn.js
 * created by csr
 * 2019/12/16
 */
class LearnService extends Service {
  async searchModules() {
    return await this.app.mysql.query('SELECT * FROM csr_fj_learn_module;');
  }
}

module.exports = LearnService;
