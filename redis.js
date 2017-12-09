/**
 * redis缓冲层
 */
const redis = require('redis');

const client = redis.createClient();


client.on('connect', function () {
    console.log("redis connect ok!");
});

client.on('end', function () {
    console.log("redis disconnect ! ");
});


const saveResult = function (method, ...rest) {
    return new Promise((resolve, reject) => {
        client[method](rest[0], rest[1], function (err, reply) {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    }).catch(error => {
        console.log(error);
    });
};

const getResult = function (method, rest) {
    return new Promise((resolve, reject) => {
        client[method](rest, function (err, reply) {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    }).catch(error => {
        console.log(error);
    });

}

const redisData = {
    /**
     * 存
     */
    save: async function (method, ...rest) {
        return await saveResult(method, ...rest);
    },

    /**
     * 取
     */
    get: async function (method, rest) {
        return await getResult(method, rest);
    }

}

module.exports = redisData;