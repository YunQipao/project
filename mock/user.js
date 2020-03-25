// 代码中会兼容本地 service mock 以及部署站点的静态数据
import { parse } from 'url';

var currentAccount = {
  test:'',
};
// mock tableListDataSource
//status 0表示禁用，1表示启用
//type 0表示普通管理员 1表示超级管理员
let tableListDataSource = [
  {
      account:'linux12345@163.com',
      username:'范老板',
      userpassword:'12345',
      status:1,
      type:1,
      permission:{
        modifyUser:false,
        createCoupon:false,
        modifyCoupon:false,
        createNotice:false,
        modifyNotice:false,
      },
  },
  {
      account:'unix12345@163.com',
      username:'palma',
      userpassword:'12345',
      status:1,
      type:0,
      permission:{
        modifyUser:false,
        createCoupon:false,
        modifyCoupon:false,
        createNotice:false,
        modifyNotice:false,
      },
  },
  {
      account:'redhat12345@163.com',
      username:'bryant',
      userpassword:'12345',
      status:1,
      type:0,
      permission:{
        modifyUser:false,
        createCoupon:false,
        modifyCoupon:false,
        createNotice:false,
        modifyNotice:false,
      },
  }
];

function getAdmin(req, res, u) {
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

console.log(params);

if (params.type) {
  dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
}

if (params.username) {
  dataSource = dataSource.filter(data => data.callNo.indexOf(params.callNo) > -1);
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

function postAdmin(req, res, u, b) {
let url = u;
if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  url = req.url; // eslint-disable-line
}

const body = (b && b.body) || req.body;
const { method, name, desc, key } = body;
//   console.log(body);body为新建表格发送的信息
// { desc:
//     { type: '0', 管理员类型
//       account: 'asdasd',  账户 
//       username: 'sadasdasd',  用户名
//       userpassword: 'asdasdasd' },  用户密码
//    method: 'post' }  传送方式

switch (method) {
  /* eslint no-case-declarations:0 */
  case 'delete':
    tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
    break;
  case 'post':
    const i = Math.ceil(Math.random() * 10000);
    tableListDataSource.push({
        status:1,
        type:body.desc.type,
        account:body.desc.account,
        username:body.desc.username,
        userpassword:body.desc.userpassword,
    });
    break;
  case 'update':
    for(let j in tableListDataSource){
      if(tableListDataSource[j].username===body.fields.username){
        // console.log(tableListDataSource[j].username);
        // console.log(body.fields.username);
        if(body.fields.modifyUser==true||body.fields.modifyUser==false){
          tableListDataSource[j].permission.modifyUser=
          body.fields.modifyUser;
        }
        if(body.fields.createCoupon==true||body.fields.createCoupon==false){
          tableListDataSource[j].permission.createCoupon=
          body.fields.createCoupon;
        }
        if(body.fields.modifyCoupon==true||body.fields.modifyCoupon==false){
          tableListDataSource[j].permission.modifyCoupon=
          body.fields.modifyCoupon;
        }
        if(body.fields.createNotice==true||body.fields.createNotice==false){
          tableListDataSource[j].permission.createNotice=
          body.fields.createNotice;
        }
        if(body.fields.modifyNotice==true||body.fields.modifyNotice==false){
          tableListDataSource[j].permission.modifyNotice=
          body.fields.modifyNotice;
        }
      }
    }
    break;
  default:
    break;
}

return getAdmin(req, res, u);
}


export default {
  // 支持值为 Object 和 Array

  //获取目前用户的个人信息接口，可以用在个人信息页面
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],

  'GET /api/adminlist': getAdmin,
  'POST /api/adminlist': postAdmin,

  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    for(var i in tableListDataSource){
      if(password===tableListDataSource[i].userpassword
        && userName ===tableListDataSource[i].username){
          if(tableListDataSource[i].type==0){
          res.send({
            status: 'ok',
            type,
            currentAuthority: 'user',
          });
          return;
        }
        if(tableListDataSource[i].type==1){
          res.send({
            status: 'ok',
            type,
            currentAuthority: 'admin',
          });
          return;
        }
        }
      }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },

  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
