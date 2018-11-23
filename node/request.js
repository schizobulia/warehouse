/**
 * api连接层
 */
const request = require('request');


const result = function (method, url, params) {
  return new Promise((resolve, reject) => {
    request[method](url, { qs: params }, function (err, httpResponse, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  }).catch(error => {
    console.log(error);
  });
}


/**
 * 连接api
 */
const apiClass = {
  /**
   * @url: url地址
   * @params: json参数
   * @returns: 返回json数据
   */
  get: async function (url, params) {
    return await result('get', url, params);
  },

  /**
   * @url: url地址
   * @params: json参数
   * @returns: 返回json数据
   */
  post: async function (url, params) {
    return await result('post', url, params);
  },
}

module.exports = apiClass;