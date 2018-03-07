const mysql = require('mysql');

const Con = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'graduate'
});

/**
    使用Promise封装mysql
    @sql: sql语句
    @values: 数据
**/

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        Con.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

let value;

/**
 * 建表
 * @param {*} name: tableName
 * createTable('message', map);
 */

async function createTable(name, clolist) {
    value = `create table ${name} (`;
    for (const key in clolist) {
        if (clolist.hasOwnProperty(key)) {
            let val = clolist[key];
            value += `${key} ${val}`
        }
    }
    value += ');';

    let result = await query(value);
    console.log(result);
}


/**
 * 改变字段长度
 * @param {*} tableName 
 * @param {*} clo 
 * @param {*} len 
 */

async function chnageCloLen(tableName, col, len) {
    value = `alter table ${tableName}  modify column ${col} char(${len});`;
    let result = await query(value);
    console.log(result);
}

/**
 * 添加一列
 * @param {*} tableName 
 * @param {*} col 
 * @param {*} type 
 * addCol('user', 'studentId', 'int(11)');
 */

async function addCol(tableName, col, type) {
    value = `Alter table ${tableName} add column ${col} ${type}`;
    let result = await query(value);
    console.log(result);
}


/**
 *删除一行 
 * @param {*} mmap 
 * delThis('user', {email: '15135460425@163.com'});
 */
delThis('ajunk', {title: '这是测试账号'});
async function delThis(tableName, mmap) {
    let key;
    for (let s in mmap) {
        key = s;
    }
    value = `DELETE FROM ${tableName} WHERE ${key} = '${mmap[key]}'`;
    await query(value);
    console.log('ok');
}

/**
 * 设置唯一约束
 * @param {*} tableName 
 * @param {*} col 字段名
 * constraint('user', 'email');
 */

async function constraint(tableName, col) {
    value = `ALTER TABLE ${tableName} ADD unique(${col})`;
    await query(value);
    console.log('ok');
}

/**
 * 增加一条记录
 * @param {*} map 
addMsg('ajunk', {title: '测试', content: '测试', userId: 'adawadczxc'});
 */

async function addMsg(tableName, map) {
    value = `INSERT INTO ${tableName} SET ?`;
    await query(value, map);
    console.log('ok');
}



let map = {
    ajunkId: 'int(11) not null',
    // desc: 'TEXT',
    // imgs: 'varchar',
    // money: 'int(10) not null',
    // time: 'Time not null',
    // userId: 'int(11) not null',

}


// addCol('ajunk', 'star', 'int(11)');
// createTable('message', map);

