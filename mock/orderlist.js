import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
let driverName=["郝大勇","庄大强","石思恩","李德军","王登科","赵克生"];

let passengerName=["张潆心","张东圣","张华辉","张鲸念","张首春",
"张顺魂","张顺引","张镇芳","张金称","张钟英","张大素","张芮熹",
"张槐花","张凌蓉","张金牙","张巧夏","张钟俊","张瑞政"];

let address=["杭州市老街镇12号","广州市番禺区小谷围镇17号","深圳市浠水镇12号","揭阳市佘家村38号",
"汕头市基恩村28号","揭阳市蛇口镇87号","茂名市沙河口27号","广州市车陂南雅致小居"];

let phone=["15627839049","15723826283","18927383843","17927384937",
"13327382736","15628394738","18927837283","18827389826","17927382937",
"15526373846","18927381527","16738492637","18824356978"];


for (let i = 0; i <50; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `${i+10000}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: ['男','女'][i%2],
    callNo: `${i+100000}`,
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),

    driverName:driverName[i%6],
    driverId:["100001","100002","100003","100004","100005","100006"][i%5],
    driverSex:"男",
    driverAddress:address[i%8],
    driverAge:i+30,
    driverPhone:phone[i%13],

    passengerName:passengerName[i%18],
    passengerId:i+10030,
    passengerSex:["男","女"][i%2],
    passengerAddress:address[(i+1)%8],
    passengerAge:i+14,
    passengerPhone:phone[(i+2)%13],

    leaveTime:"2017-06-01 20:30:18",
    leavePlace:"广州天河北京路",
    arriveTime:"2017-06-01 21:30:01",
    arrivePlace:"广州番禺大学城",
    price:`${i+i*0.5+30}`,



  });
}

function getOrder(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.callNo) {
    dataSource = dataSource.filter(data => data.callNo.indexOf(params.callNo) > -1);
  }

  if (params.driverName) {
    dataSource = dataSource.filter(data => data.driverName.indexOf(params.driverName) > -1);
  }

  if (params.passengerName) {
    dataSource = dataSource.filter(data => data.passengerName.indexOf(params.passengerName) > -1);
  }


  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postOrder(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getOrder(req, res, u);
}

export default {
  'GET /api/orders': getOrder,
  'POST /api/orders': postOrder,
};
