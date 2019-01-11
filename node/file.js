const fs = require('fs');
const readline = require('readline');
// =====================node对文件的操作==============================

/**
 * 给最后一行写入数据
 * @param {*} file 
 * for (let index = 0; index < 10; index++) {
 *     await write('test.txt', `this is ${index}`);
 * }
 */
function writeToEndLine(file, content) {
    return new Promise((resolve, reject) => {
        fs.open(file, 'a', (err, fd) => {
            if (err) {
                reject(err)
            } else {
                let writeBuffer = new Buffer(`${content}\r\n`),
                    bufferPosition = 0,
                    bufferLength = writeBuffer.length,
                    filePosition = null;
                fs.write(fd, writeBuffer, bufferPosition, bufferLength, filePosition, function wrote(err, written) {
                    fs.close(fd, () => { })
                    if (err) {
                        reject(err);
                    } else {
                        resolve(written);
                    }
                    writeBuffer = null;
                });
            };
        });
    });
}

/**
 * 获取目录下所有的文件
 */
async function getFile() {
    const files = await fs.readdirSync(__dirname);
    while (files.length) {
        let file = files.pop();
        let is = path.extname(file);
        if (is === '.jpg') {
        }
    }
}


/**
 * 逐行读取文件
 * @param {*} file 
 * @param {*} callback 
 */
function readLine(file, callback) {
    const read = fs.createReadStream(file);
    const objreadline = readline.createInterface({
        input: read,
    });
    let arr = [];
    objreadline.on('line', (line) => {
        arr.push(line);
    });
    objreadline.on('close', async () => {
        callback(arr);
    })
}
