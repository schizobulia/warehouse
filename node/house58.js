const puppeteer = require('puppeteer');
const URL = 'https://bj.58.com/chuzu/?PGTID=0d100000-0000-15aa-9490-4a9747f9c477&ClickID=4';

/** 
 *  npm i --save puppeteer --ignore-scripts   (建议换成cnpm)
 *  手动下载Chromium：https://download-chromium.appspot.com
 *  chromium：https://blog.csdn.net/u010142437/article/details/79126564
 *  官方文档：https://pptr.dev/
 */
(async () => {
    const browser = await puppeteer.launch({
        executablePath: './chromium/chrome.exe',
        headless: false,
        timeout: 3000,
    });
    const page = await browser.newPage();
    await page.goto(URL);

    let selector = 'body > div.mainbox > div > div.content > div.listBox > ul > li';
    let nextbtn = '.next';
    let allData = [];
    allData.push(await getPageData(page, [selector, true]))
    await page.click(nextbtn)
    await page.waitFor(2000);


    let thread = setInterval(async () => {
        await page.click(nextbtn);
        await page.waitFor(3000);
        let item = await getPageData(page, [selector, false]);
        if (item.length === 0) {
            clearInterval(thread);
        } else {
            allData.push(item);
        }
    }, 5000);

})();


/**
 * 抓取一页的数据
 * @param {*} page 
 * @param {*} arr 
 */
async function getPageData(page, arr) {
    const lists = await page.evaluate((arr) => {
        let selector = arr[0];
        let isJquery = arr[1];
        //植入jquery
        if (isJquery) {
            let srcipt = document.createElement('script');
            srcipt.src = 'https://cdn.bootcss.com/jquery/3.3.1/core.js';
            document.getElementsByTagName('body')[0].appendChild(srcipt);
        }
        const domparent = Array.from($(selector));

        let getDataByDom = (domparent) => {
            let data = [];
            domparent.map((e) => {
                let title = $(e).find('h2 > a').text() || '';
                let type = $(e).find('.room').text() || '';
                let address = $(e).find('p.add > a').text() || '' + $(e).find('p.add > a').text() || '' + $(e).find('p.add').text();
                let people = $(e).find('.jjr').text() + $(e).find('.jjr .jjr_par .jjr_par _dp').text() + '= 姓名：' + $(e).find('.jjr .jjr_par .jjr_par  .listjjr').text();
                let money = $(e).find('.listliright .money').text();
                data.push({
                    title: title,
                    type: type,
                    address: address,
                    people: people,
                    money: money,
                });
            });
            return data;
        }
        return getDataByDom(domparent);
    }, arr);
    return lists;
}



async function close(browser) {
    await browser.close();
}

