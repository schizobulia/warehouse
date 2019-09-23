const { Client } = require('@elastic/elasticsearch');
/**
 * es -> 7.3.1
 * 
 * $ mkdir es
 * $ cd es
 * $ npm init -yes
 * $ npm install @elastic/elasticsearch
 * 
 */
const client = new Client({
    node: 'http://49.234.195.116:9200',
    auth: {
        username: '******',
        password: '******'
    }
});

/**
 * type：[
 * 大佬们的博客,
 * 插件库,
 * 平台与工具,
 * 日常办公,
 * 前端,
 * 后端,
 * Android,
 * 大数据,
 * 网络安全,
 * 设计相关,
 * api文档,
 * 一些好看的效果,
 * ai,
 * 大数据,
 * 运维,
 * 其他,]
 */
async function main() {
    // await add();
    // await search();
    // await update();
}


/**
 * 添加数据
 */
async function add() {
    let object = {
        t: '记录您的东西从未如此简单！',
        l: 'https://www.docz.site',
        d: '文件,记录,MD,站点',
        type: '日常办公'
    };
    let result = await client.create({
        id: new Date().getTime(),
        index: 'warehouse',
        type: '_doc',
        body: object
    });
    console.log(result);
    await close();
}


/**
 * 查询数据
 */
async function search() {
    let result = await client.search({
        index: 'warehouse',
        type: "_doc",
        body: {
            "query": {
                "query_string": {
                    "query": "开源免费的在线教育系统"
                }
            }
        }
    });
    console.log(result);
    await close();
}


/**
 * 更新数据
 */
async function update() {
    let result = await client.update({
        index: 'warehouse',
        type: '_doc',
        id: '1568962420601',
        body: {
            doc: {
                l: 'https://github.com/Qsnh/meedu'
            }
        }
    })
    console.log(result.body.hits.hits);
    await close();
}




/**
 * 关闭客户端
 */
async function close() {
    await client.close();
}

main();