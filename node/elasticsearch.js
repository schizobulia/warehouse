var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://192.168.88.100:9200/',
});


/**
 * 获取文档数量
 * getNumByDocName('bank');
 * @param {*} doc_index 
 */
async function getNumByDocName(doc_index) {
    return await client.count({
        index: doc_index,
    }).catch((e) => { });
}

/**
 * 需要对数据验证
 * 获取所有数据
 * cs('bank')
 */
async function getAll(doc_index) {
    let responseQueue = [];
    let data = [];
    let count = [];
    let one = await client.search({
        index: doc_index,
        // body: {
        //     "query": {
        //         "match_phrase": {
        //             "age": "25"
        //         }
        //     }
        // },
        scroll: '30s',
    }).catch((e) => {
        console.log(e);
    });
    console.log(one)
    responseQueue.push(one);
    data.push(one.hits.hits);
    while (responseQueue.length) {
        const response = responseQueue.shift();
        response.hits.hits.map((e) => {
            count.push(e._index);
        });

        if (count.length === response.hits.total) {
            break;
        }
        let s = await client.scroll({
            scrollId: response._scroll_id,
            scroll: '30s',
        }).catch((e) => { });
        responseQueue.push(s);
        data.push(s.hits.hits);
    }
    let alldata = [];
    data.map((e) => {
        alldata = alldata.concat(e);
    });
    alldata.map((e) => {
        if (e._id === 648) {
            console.log(i)
        }
    })
    return alldata;
}

/**
 * 查询子网ip
 * @param {*} doc_index 
 */
async function query_subnet_ip(doc_index) {
    const sql = { "query": { "match_phrase": { "@version": "1" } }, "aggs": { "ip_ranges": { "ip_range": { "field": "ip", "ranges": [{ "mask": "255.255.255.255/25" }] } } } };
    return await client.search({
        index: doc_index,
        body: sql,
    });
}


async function createIndex(_index, data) {
    return await client.create({
        index: _index,
        type: 'doc',
        id: '1',
        body: data,
    });
}

/**
 * 插入一天数据
 * inster('users', {
    name: 'asdasdasdasdada', password: 'asdasdasdasd', icon: '/public/img/favicons.png',
    tag: 'asdasda', address: 'asdsadasd', department: 'asdasdsad', permissions: 'asdasdasd',
   });
 * @param {*} _index 
 * @param {*} data 
 */
function inster(_index, data) {
    client.bulk({
        body: [
            { index: { _index: _index, _type: 'use', _id: 2 } },
            { field1: data },
        ]
    }, function (err, resp) {
        if (err) {
            console.log(err, 'err');
        }
        console.log(resp);
    });
}

/**
 * 是否存在
 * @param {*} _index 
 * @param {*} sql 
 */
async function isExties(_index, sql) {
    const sql = { "query": { "bool": { "must": [{ "term": { "name": 'datian' } }, { "term": { "password": '123123asdasd123aaab' } }] } } };
    return await client.search({
        index: _index,
        body: sql,
    });
}