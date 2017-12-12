/**
 * 根据json数据 ---> 创建 ---> Excel表
 */
const jexcel = require('json2excel');  //创建Excel表
const jsonFile = require('jsonfile');   //读取json数据
const path = require('path');
const fs = require('fs');


/**
 * 读取json文件
 */
jsonFile.readFile('filename.json', function (err, jsonData) {
    let list = JSON.parse(jsonData);    //格式：[{name: '苛苛', sex: '男', }, {...}]
    generationXls(userItem);  
});

/**
 * 创建xlsx文件  并导入json数据
 */
function generationXls(userItem) {
    let sheet1 = {
        header: {
            'name': '姓名',
            'sex': '性别'

        },
        items: userItem,
        sheetName: 'sheet1'  //  
    };

    let data = {
        sheets: [sheet1],
        filepath: path.join(path.resolve(__dirname, '../..'), "xls/j2x.xlsx")
    }

    fs.writeFile(path.join(path.resolve(__dirname, '../..'), "xls/output.txt"), "Hello World!", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("File saved successfully!");
    });


    jexcel.j2e(data, function (err) {
        console.log('finish')
    });

}



