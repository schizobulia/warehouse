// let pg = require('pg');

const promise = require('bluebird'); // or any other Promise/A+ compatible library;
const options = {
    promiseLib: promise, // default promise override;
};
const pgp = require('pg-promise')(options);

// 数据库配置
let config = {
    user: "postgres",
    database: "cishi",
    password: "123456",
    port: 5432,

    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}

//官方文档：https://www.npmjs.com/package/pg-promise

/**
 * 使用第三方的包:pg-promise  读取
 */
let db = pgp(config);

/**
 * 查询多条
 * 查询id 为 1 2 的数据 但有时需要将table的name 加双引号
 */
// let array = ['1', '2'];
// db.any('SELECT * FROM teacher WHERE id in ($1:csv)', [array])
//     .then(function (data) {
//         console.log(data);
//     }).catch(function (err) {
//         console.log(err);
//     });


/**
 * 查询单条(单条件)
 */

// db.any('SELECT * FROM teacher WHERE name = $1', 'aaa')
//     .then(function (data) {
//         console.log(data);
//     }).catch(function (err) {
//         console.error(err);
//     });

/**
 * 多条件查询
 */

// db.any('SELECT * FROM teacher WHERE name = ${name} AND pwd = ${pwd}', {
//     name: 'bbb',
//     pwd: '111'
// }).then(function (data) {
//     console.log(data);
// }).catch(function (err) {
//     console.error(err);
// });




/**
 * 连接池的方式连接 
 */

// let pool = new pg.Pool(config);

// pool.on('acquire', function (client) {
//     console.log("acquire Event");
// });

// pool.on('connect', function () {
//     console.log("connect Event");
// });

// pool.on("error", function (err, client) {
//     console.log("error --> ", err);
// });


// 查询
// pool.connect(function (err, client, done) {
//     if (err) {
//         return console.error('数据库连接出错', err);
//     }
//     // 简单输出个 Hello World

//     client.query('select * from teacher where "id" = ${id}', { id: 1 }, function (err, results, fields) {
//         // done();// 释放连接（将其返回给连接池）
//         if (err) {
//             return console.error('查询出错', err);
//         }

//         if (results.rowCount > 0) {
//             let firstResult,
//                 resultSet = '';
//             for (let i = 0, len = results.rowCount; i < len; i++) {
//                 firstResult = results.rows[i];
//                 resultSet += 'id:' + firstResult['id'] + ' ' + 'name:' + firstResult['name'] + ' ' +
//                     'pwd:' + firstResult['pwd'] + '\n';
//             }
//             console.log(resultSet);
//         }
//     });
// });