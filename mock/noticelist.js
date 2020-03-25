import { parse } from 'url';
import { stringify } from 'querystring';

// mock tableListDataSource
let tableListDataSource = [];
let sex=["男","女"];
let phone=["15683789586","18937483940","17928375809","15728374583","13892805632"];

let userfeedback=[];
for (let i = 0; i <50; i += 1) {
  userfeedback.push({
    id:i,
    title:['司机服务态度差','司机故意绕路'][i%2],
    content:['不仅没有准时到达预定地点接我们，而且态度很差！','司机一直没有按照导航的较短路径开车！'][i%2],
    time:['2017-06-02 22:03:56','2017-06-03 08:04:02'][i%2],
  });
}

for (let i = 0; i <50; i += 1) {
  tableListDataSource.push({
    key: i,
    title: `一个公告标题 ${i}`,
    content:`这是第${i}段公告的内容`,
    time:'2017-06-02 22:03:56',
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `user ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: `${i+100000}`,
    status: Math.floor(Math.random() * 10) % 2,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    sex:sex[i%2],
    phone:phone[i%5],
    address:["广州番禺小谷围镇北亭村","广州天河惠贵花园","广州车陂南封明大街"][i%3],
    historyOrders:[[1,2],[2,3],[3,4]][i%3],
    creditScore:Math.floor(Math.random()*(51)+50),
    feedback:userfeedback[i],
  });
}


function getNotice(req, res, u) {
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

  if(params.key){
    let filterDataSource = [];
    for(let i in dataSource){
      if(dataSource[i].key==params.key){
        filterDataSource.push(dataSource[i]);
      }
    }
    dataSource = filterDataSource;
  }

  if(params.title){
    let filterDataSource = [];
    for(let i in dataSource){
      if(dataSource[i].title==params.title){
        filterDataSource.push(dataSource[i]);
      }
    }
    dataSource = filterDataSource;
  }

  if(params.content){
    let filterDataSource = [];
    for(let i in dataSource){
      if(dataSource[i].content==params.content){
        filterDataSource.push(dataSource[i]);
      }
    }
    dataSource = filterDataSource;
  }


  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  if (params.callNo) {
    dataSource = dataSource.filter(data => data.callNo.indexOf(params.callNo) > -1);
  }

  if (params.phone) {
    dataSource = dataSource.filter(data => data.phone.indexOf(params.phone) > -1);
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

function postNotice(req, res, u, b) {
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

  return getNotice(req, res, u);
}

export default {
  'GET /api/notice': getNotice,
  'POST /api/notice': postNotice,
};
