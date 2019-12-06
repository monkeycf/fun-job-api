'use strict';

/**
 * app/public/helper.js
 * created by csr
 * 2019/12/06
 */


// 下划线转换驼峰
const toHump = line => line.replace(/_(\w)/g, (a, l) => l.toUpperCase());


// 驼峰转下划线
const toLine = hump => hump.replace(/([A-Z]|\d)/g, (a, l) => `_${l.toLowerCase()}`);


module.exports = {
  /** *
   * 将对象的属性下划线形式转为驼峰
   * @param {Object} obj 下划线形式的对象
   * @return {Object} {{}}
   */
  toHumpObject(obj) {
    const newObj = {};
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        newObj[toHump(k)] = obj[k];
      }
    }
    obj = null;
    return newObj;
  },

  /** *
   * 将对象的属性驼峰转为下划线形式
   * @param {Object} obj 需要转化的对象
   * @return {Object} {{}}
   */
  toLineObject(obj) {
    const newObj = {};
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        newObj[toLine(k)] = obj[k];
      }
    }
    obj = null;
    return newObj;
  },
};
