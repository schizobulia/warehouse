/**
 * 根据json数据 ---> 创建 ---> Excel表
 */
const jexcel = require('json2excel');  //创建Excel表
const jsonFile = require('jsonfile');   //读取json数据
const path = require('path');
const fs = require('fs');
const xl = require('xlsx');

/**
 * 读取json文件
 */
function readJsonFile(jsonpath) {
    jsonFile.readFile(jsonpath, function (err, jsonData) {
        let list = JSON.parse(jsonData);    //格式：[{name: '苛苛', sex: '男', }, {...}]
        generationXls(userItem, (data) => {
            console.log(data);
        });  
    });
}



/**
 * 创建xlsx文件 并导入json数据 
 */
function generationXls(userItem, callback) {
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
            callback(err);
            return;
        }
        console.log("File saved successfully!");
    });


    jexcel.j2e(data, function (err) {
        callback(data);
    });
}

/**
 * 读取json文件并返回数组
 */
function getJsonArray(path) {
    var newArray = [];
    var workbook = xl.readFile(path, { bookType: 'xlsx' });
    var object = workbook.Sheets.Sheet1;
    //返回json数据
    var dataa = xl.utils.sheet_to_json(object);
    for (let index = 0; index < dataa.length; index++) {
        const element = dataa[index];
        console.log(element);
        let obj = {};
        obj.type = 1;
        newArray.push(obj);
    }
    return newArray;
}



