/**
 * 以下方法仅仅适用于脚本中使用(一些优化手段并未考虑)，真实项目中请注意关闭client。
 */

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://192.168.88.192:9200/trails-181031/session',
});
var fs = require('fs');


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
 * cs('bank', {sql})
 */
async function getAll(doc_index, body) {
    let responseQueue = [];
    let data = [];
    let one = await client.search({
        size: 5000,
        index: doc_index,
        body: body,
        scroll: '30s',
    }).catch((e) => {
        console.log(e);
    });
    console.log('start')
    responseQueue.push(one);
    let i = 0;
    while (responseQueue.length) {
        const response = responseQueue.shift();
        if (data.length > 10000) {
            i++;
            await fs.writeFileSync(`./mdata/${i}.json`, data);
            data = [];
        }
        response.hits.hits.map((e) => {
            data.push(e);
        });
        if (response.hits.hits.length === 0) {
            break;
        }
        let scroll_data = await client.scroll({
            scrollId: response._scroll_id,
            scroll: '30s',
        }).catch((e) => { console.log(e) });
        responseQueue.push(scroll_data);
        scroll_data = null;
    }
    console.log('end');
    return 'end';
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


/**
 * 建议使用http去创建
 * @param {*} _index 
 * @param {*} data 
 */
async function createIndex(_index, data) {
    return await client.create({
        index: _index,
        type: 'session',
        number_of_shards: 0,
        number_of_replicas: 0,
        id: '10',
        body: data,
    });
}

/**
 * 插入数据
 * @param {*} _index 
 * @param {*} data 
 */
function inster(_index, data, type) {
    client.bulk({
        body: [
            { index: { _index: _index, _type: type, _id: new Date().getTime() } },
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

/**
 * 按月查询次数
 */
async function getDataByTime() {
    const sql = {
        "size": 0,
        "query": {
            "match_phrase": {
                "dstIP": {
                    "query": "59.252.32.235"
                }
            }
        },
        "aggs": {
            "sales": {
                "date_histogram": {
                    "field": "@timestamp",
                    "interval": "month",
                    "format": "yyyy-MM-dd"
                }
            }
        }
    };
    return await client.search({
        index: 'dns_log-2017040316',
        body: sql,
    });
}

/**
 * 更新doc根据query
 */
async function updateByQuery() {
    return await client.updateByQuery({
        index: 'sess*',
        body: {
            "query": {
                "bool": {
                    "filter": [
                        {
                            "terms": {
                                "name": ['a', 'b']
                            }
                        },
                    ]
                }
            },
            "script": {
                "source": "ctx._source['isthreat']='1';"
            }
        }
    }).catch((e) => console.log(e));
}

main();
