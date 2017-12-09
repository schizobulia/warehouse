// var pg = require('pg');

var promise = require('bluebird'); // or any other Promise/A+ compatible library;
var options = {
    promiseLib: promise, // default promise override;
};
var pgp = require('pg-promise')(options);

// 数据库配置
var config = {
    user: "postgres",
    database: "cishi",
    password: "123456",
    port: 5432,

    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}
var db = pgp(config);

var array = ['1', '2'];
db.any('SELECT * FROM teacher WHERE id in ($1:csv)', [array])
    .then(function (data) {
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    });


// 创建连接池
// var pool = new pg.Pool(config);

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
//             var firstResult,
//                 resultSet = '';
//             for (var i = 0, len = results.rowCount; i < len; i++) {
//                 firstResult = results.rows[i];
//                 resultSet += 'id:' + firstResult['id'] + ' ' + 'name:' + firstResult['name'] + ' ' +
//                     'pwd:' + firstResult['pwd'] + '\n';
//             }
//             console.log(resultSet);
//         }
//     });
// });