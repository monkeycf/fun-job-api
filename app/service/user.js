'use strict';

const Service = require('egg').Service;

/**
 * app/service/user.js
 * created by csr
 * 2019/12/06
 */
class UserService extends Service {
  // 统计手机号的次数
  async countPhone({ phone }) {
    // 校验手机号长度
    const PHONE_LENGTH = 11;
    if (phone.toString().length !== PHONE_LENGTH) {
      throw '请输入正确手机号';
    }

    const { conn } = this.ctx;
    const sumArray = await conn.query('SELECT count(*) as sum FROM csr_fj_user WHERE phone = ?;', [ phone ]);
    const { sum } = sumArray[0];

    if (sum === 1) {
      throw '手机号已注册';
    }
  }

  // 创建用户
  async createUser({ phone, pwd }) {
    const { conn } = this.ctx;
    await conn.query('INSERT INTO csr_fj_user (`phone`,`password`) VALUES(?,?);', [ phone, pwd ]);
  }

  // 查询用户id
  async queryUserIdByPhone({ phone }) {
    const userInfo = await this.ctx.conn.query('SELECT id FROM csr_fj_user WHERE phone = ?;', [ phone ]);
    return userInfo[0];
  }
}

module.exports = UserService;
