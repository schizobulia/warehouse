/**
 * api连接层
 */
const request = require('request');


const result = function (method, url, params) {
    return new Promise((resolve, reject) => {
        request[method](url, {qs: params}, function(err, httpResponse, body){
            if (err) {
                reject(err);
            }else{
                resolve(JSON.parse(body));
            }
        });
    }).catch(error=> {
        console.log(error);
    });
}


/**
 * 连接api
 */
const apiClass = {
    /**
     * @url: url地址
     * @params: json参数
     * @returns: 返回json数据
     */
    get: async function (url, params) {
        return await result('get', url, params);
    },

    /**
     * @url: url地址
     * @params: json参数
     * @returns: 返回json数据
     */
    post: async function (url, params) {
        return await result('post', url, params);
    },
}

module.exports = apiClass;









/**
 * api连接层
 */
const request = require('request');
const fs = require('fs');
let urls = ["https://zeustracker.abuse.ch/blocklist.php?download", "https://zeustracker.abuse.ch/monitor.php?filter", "https://zeustracker.abuse.ch/blocklist.php?download", "https://zeustracker.abuse.ch/blocklist.php?download", "http://vxvault.net/URL_List.php", "http://www.voipbl.org/update/", "http://www.urlvir.com/export-hosts/", "https://urlhaus.abuse.ch/downloads/text/", "https://www.turris.cz/greylist-data/greylist-latest.csv", "https://github.com/JR0driguezB/malware_configs", "https://torstatus.blutmagie.de/ip_list_all.php/Tor_ip_list_ALL.csv", "https://check.torproject.org/cgi-bin/TorBulkExitList.py?ip", "https://www.talosintelligence.com/feeds/ip-filter.blf", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/sslproxies_1d.ipset", "https://sslbl.abuse.ch/blacklist/sslipblacklist.csv", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/socks_proxy_7d.ipset", "https://sblam.com/blacklist.txt", "https://report.cs.rutgers.edu/DROP/attackers", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/ri_web_proxies_30d.ipset", "https://ransomwaretracker.abuse.ch/downloads/RW_URLBL.txt", "https://ransomwaretracker.abuse.ch/downloads/RW_IPBL.txt", "https://ransomwaretracker.abuse.ch/downloads/RW_DOMBL.txt", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/proxyspy_1d.ipset", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/proxyrss_1d.ipset", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/proxylists_1d.ipset", "https://cybercrime-tracker.net/ccpmgate.php", "https://raw.githubusercontent.com/futpib/policeman-rulesets/master/examples/simple_domains_blacklist.txt", "https://palevotracker.abuse.ch/blocklists.php?download", "https://openphish.com/feed.txt", "https://www.nothink.org/blacklist/blacklist_malware_irc.txt", "https://myip.ms/files/blacklist/htaccess/latest_blacklist.txt", "https://raw.githubusercontent.com/Hestat/minerchk/master/hostslist.txt", "https://www.maxmind.com/en/high-risk-ip-sample-list", "https://lists.malwarepatrol.net/cgi/getfile?receipt", "http://malwaredomains.lehigh.edu/files/domains.txt", "https://www.malwaredomainlist.com/hostslist/hosts.txt", "https://malc0de.com/bl/ZONES", "https://raw.githubusercontent.com/gwillem/magento-malware-scanner/master/rules/burner-domains.txt", "https://raw.githubusercontent.com/Neo23x0/signature-base/39787aaefa6b70b0be6e7dcdc425b65a716170ca/iocs/otx-c2-iocs.txt", "https://blocklist.greensnow.co/greensnow.txt", "https://feodotracker.abuse.ch/blocklist/?download", "https://feodotracker.abuse.ch/blocklist/?download", "https://rules.emergingthreats.net/open/suricata/rules/emerging-dns.rules", "https://rules.emergingthreats.net/open/suricata/rules/compromised-ips.txt", "https://rules.emergingthreats.net/open/suricata/rules/botcc.rules", "https://feeds.dshield.org/top10-2.txt", "https://isc.sans.edu/feeds/suspiciousdomains_Low.txt", "https://dataplane.org/*.txt", "https://cybercrime-tracker.net/all.php", "https://www.cruzit.com/xwbl2txt.php", "http://cinsscore.com/list/ci-badguys.txt", "http://danger.rulez.sk/projects/bruteforceblocker/blist.php", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/botscout_1d.ipset", "https://lists.blocklist.de/lists/all.txt", "https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/bitcoin_nodes_1d.ipset", "https://osint.bambenekconsulting.com/feeds/dga-feed.txt", "https://osint.bambenekconsulting.com/feeds/c2-dommasterlist-high.txt", "https://www.badips.com/get/list/any/2?age", "https://cybercrime-tracker.net/ccam.php", "https://reputation.alienvault.com/reputation.generic", "https://data.netlab.360.com/feeds/dga/virut.txt", "https://data.netlab.360.com/feeds/dga/tofsee.txt", "https://data.netlab.360.com/feeds/dga/necurs.txt", "https://data.netlab.360.com/feeds/dga/locky.txt", "https://data.netlab.360.com/feeds/dga/gameover.txt", "https://data.netlab.360.com/feeds/dga/cryptolocker.txt", "https://data.netlab.360.com/feeds/dga/conficker.txt", "https://data.netlab.360.com/feeds/dga/chinad.txt"];
urls = Array.from(new Set(urls));

const result = function (method, url, params) {
  return new Promise((resolve, reject) => {
    request[method](url, { data: params }, function (err, httpResponse, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  }).catch(error => {
    console.log(error);
  });
}


/**
 * 连接api
 */
const ApiClass = {
  /**
   * @url: url地址
   * @params: json参数
   * @returns: 返回json数据
   */
  get: async function (url, params) {
    return await result('get', url, params);
  },

  /**
   * @url: url地址
   * @params: json参数
   * @returns: 返回json数据
   */
  post: async function (url, params) {
    return await result('post', url, params);
  },

  put: async function (url, params) {
    return await result('put', url, params);
  }
}



async function cs(url, filename) {
  let _mdata = '';
  let s = await ApiClass.get(url, {});
  let data = s.split('\n');
  let result = [];
  data.map((e, i) => {
    let obj = {};
    if (e.includes('#')) {
      return;      
    }
    let ip = '';
    obj.source = url;
    let info = e.split('\t');
    if (info.length != 0 && info[0]) {
      ip = info[0];
    }
    if (isIp(ip)) {
      obj.content = ip;
      obj.type = 'ip';
      obj.starttime = new Date().getTime();
      obj.endtime = new Date().getTime();
      result.push(obj);
    } else if (isUrl(ip)) {
      obj.content = ip;
      obj.type = 'domain';
      obj.starttime = new Date(info[1]).getTime();
      obj.endtime = new Date(info[2]).getTime();
      result.push(obj);
    }
  });
  result.map((ele) => {
    _mdata += JSON.stringify(ele) + '\r\n';
  });
  await fs.writeFileSync(`./mdata/${filename}.json`, _mdata, (err) => { console.log(err) });
  console.log(filename, url)
  _mdata = '';
}



async function main() {
  let i = 0;
  while (urls.length) {
    let url = urls.pop();
    i++;
    await cs(url, i);
  }
  console.log('end');
}

main()

function isUrl(url) {
  return !!url.match(/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/);
}

/**
*是否是ip地址 
*/
function isIp(ip) {
  var pattern = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/;
  return pattern.test(ip);
}
