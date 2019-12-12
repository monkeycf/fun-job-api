/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575609432541_7882';

  // add your middleware config here
  config.middleware = [];

  // 跨域设置
  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 配置cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // mysql配置
  const mysqlConfig = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '106.15.186.195',
        // 端口号
        port: '3306',
        // 用户名
        user: 'an_csr',
        // 密码
        password: 'csr2019',
        // 数据库名
        database: 'fun_job_dev',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };

  return {
    ...config,
    ...userConfig,
    ...mysqlConfig,
    logview: {},
  };
};
