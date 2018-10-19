const mysql = require('mysql');
const fs = require('fs');

const Con = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'esc'
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
                    connection.destroy();
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
 */
//delThis('user', {email: '15135460425@163.com'});
async function delThis(tableName, mmap) {
    let key;
    for (let s in mmap) {
        key = s;
    }
    value = `DELETE FROM ${tableName} WHERE ${key} = '${mmap[key]}'`;
    await query(value);
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
}

/**
 * 增加一条记录
 * @param {*} map 
addMsg('ajunk', {title: '测试', content: '测试', userId: 'adawadczxc'});
 */

async function addMsg(tableName, map) {
    value = `INSERT INTO ${tableName} SET ?`;
    let result = await query(value, map);
    console.log(result);
    if (result) {
        return true;
    } else {
        return false;
    }
}
/**
 * 两张表之间的关联
 * @param {*} tableName1  外键表 
 * @param {*} tableName2  主键表
 * @param {*} key1 外键
 * @param {*} key2 主键
 * @param {*} tag  外键标识
 * mainkey('users', 'scholl', 'scholl_id', 'scholl_id', 'fk_7');
 */
async function mainkey(tableName1, tableName2, key1, key2, tag) {
    value = "alter table `" + tableName1 + '` add constraint `' + tag + '` foreign key (`' + key1 + '`) references `' + tableName2 + '` (`' + key2 + '`)';
    const result = await query(value);
}

/**
 * 更新
 */
async function update(key, value, id, idvalue) {
    let result = await query("update `users` set ` " + key + "`= " + value + " where `" + id + "` = " + idvalue + " limit 1");
}

async function all() {
    let result = await query("select * from pf_sys_log");
    let a = '';
    result.map((e, i) => {
        a += (JSON.stringify([
            { "index": { "_id": i } }
        ]) + '/n');
        a += (JSON.stringify(e) + '/n');
    });

    fs.writeFileSync('data.json', JSON.stringify(a), (err) => {
        console.log(err);
    })
}
all();