const WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({
    port: 3000
});

//在线人数
let userList = [];


//所有的房间信息
let rooms = [];


/**
 * 
 * api:
    上线: {status: 1, userId: 2};
    下线：{status: 0, userId: 2};                               
    开房：{status: 3, sendId: 1, receiveId: 1, roomId: 555};
    关房: {status: 4, sendId: 1, receiveId: 1, roomId: 555};
    不在线: {status: 5}
    开房成功: {status: 6, roomInfo: {}};
    sendId: 请求视频的人,   receiveId: 接收者  开房也就是也就是发起通话
    #请求参数请全部转换为string类型
 * 
 */



wss.on('connection', function (ws, req) {

    //个人信息
    let mIp = {};

    ws.on('close', function close(err) {
        userDisconnect(mIp, ws);
    });

    ws.on('error', function (error) {
        if (error.code === 'ECONNRESET') {
            userDisconnect(mIp, ws);
        }
    });


    ws.on('message', function (message) {
        let data = JSON.parse(message);
        let status = data.status;
        let userId = data.userId || -1;
        if (status === '1' && new Number(userId) < 0) {
            return;
        }
        if (status === '1') {   //上线
            if (!isLogin(ws, userId)) {
                return;
            };
            userList.push(userId);
            onLine(ws, status);
            mIp.userId = userId;
            return;
        } else if (status === '0') {   //下线
            userList.pop(userId);
            onLine(ws, status);
            mIp = null;
            return;
        }
        if (status === '3') {
            if (!contains(userList, JSON.parse(message).receiveId)) {
                noOnLine(ws);
                return;
            }

            rooms.push(message);
            margie(ws, message);
            return;
        }

        if (status === '4') {
            rooms.pop(message);
            margie(ws, message);
        }

        if (status === '6') {
            margie(ws, JSON.stringify({ status: status, roomInfo: message }));
        }
    });
});

/**
 * 上线 | 下线
 * @param {*} ws 
 */

function onLine(ws, status) {
    let success = JSON.stringify({ users: userList, status: status });
    ws.send(success, (err) => {
        if (err) {
            console.error(`[SERVER] error: ${err}`);
        }
    });
    // broadcast(success);
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(success);
        }
    });
}

function isLogin(ws, userId) {
    if (userList.indexOf(userId) === 0) {
        ws.send(JSON.stringify({ status: '该用户已在线' }), (err) => {
            if (err) {
                console.error(`[SERVER] error: ${err}`);
            }
        });
        return false;
    } else {
        return true;
    }
}


/**
 * 开房  | 关房 
 * @param {*} ws 
 * @param {*} msg 
 */
function margie(ws, msg) {
    ws.send(msg, (err) => {
        if (err) {
            console.log(`[SERVER] error: ${err}`);
        }
    });
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

/**
 * 该用户不在线
 * @param {*}  
 */
function noOnLine(ws) {
    let data = { status: '5' };
    ws.send(JSON.stringify(data), (err) => {
        if (err) {
            console.error(`[SERVER] error: ${err}`);
        }
    });
}

/**
 * 查询数组中是否有该元素
 * @param {*} arr 
 * @param {*} obj 
 */
function contains(arr, obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}



/**
 * 用户主动断开
 * @param {*} mIp 
 */
function userDisconnect(mIp, ws) {
    const id = mIp.userId;
    if (userList.length > 0 && id) {
        userList.pop(id);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ status: '0', userId: id }));
                mIp = null;
            }
        });
    }
}
