import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List, Form} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DriverProfile.less';
import Link from 'umi/link';
import { PureComponent, Fragment } from 'react';
import { Router } from 'react-router';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';

const { Description } = DescriptionList;

@connect(({ orderss, loading }) => ({
  orderss,
  loading: loading.models.orderss,
}))
@Form.create()
  class DriverProfile extends Component {
    constructor(props){
      super(props);
      this.state={
        data:[],
      };
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'orderss/fetch',
    });

    var obj1=[];
    fetch('https://www.kingdom174.work/Alogin?ADname=%E8%8C%83%E8%80%81%E6%9D%BF&password=12345',
    {
      method:'GET', 
    })
    .then(res => res.text()
    )
    .then(
   res => {
    obj1=res.split("<br>");
    this.setState({
      data:obj1
    })
     }
   );
  }

    render() {

    const url=this.props.match.url;
    var strs = new Array(); //定义一数组
    strs = url.split("/"); //字符分割

    const nullobj={
        name:'',
        avatar:'',
        desc:'',
        progress:'',
        status:'',
        callNo:'',
        title:'',
    };

    let person=[];
    try{
        var obj=this.props.location.state.data.list;
        for(var i in obj) {
            for(var j in obj[i]){
                if(strs[3]==obj[i].name)
                person=obj[i];
            }
        }
        if(person.status==0){
          person.status="司机";
        }
        else{
          person.status="乘客";
        }
    }catch(err){
        person=nullobj;
    }

    var ordersData=[];
    var orderID1=-1,orderID2=-1;
    try{
      orderID1=person.historyOrders[0]+100000;
      orderID2=person.historyOrders[1]+100000;
      var orderList=this.props.orderss.data.list;
      for(var i in orderList){
        for(var j in orderList[i]){
          if(orderID1==orderList[i].callNo||
            orderID2==orderList[i].callNo){
            ordersData.push(orderList[i]);
            break;
          }
        }
      }
  }catch(err){}

    const columns = [
      {
        title: '订单ID',
        dataIndex: 'callNo',
        sorter: true,
        render: val => `${val}`,
        // mark to display a total number
        needTotal: true,
        render: text => <Link to={{pathname:`/ordermanage/orderdetails/${text}`,state:this.props.orderss}}>{text}</Link>
      },
      {
        title: '司机昵称',
        dataIndex: 'driverName',
      },
      {
        title: '乘客昵称',
        dataIndex: 'passengerName',
      },
      {
        title: '出发时间',
        dataIndex: 'leaveTime',
      },
      {
        title: '出发地点',
        dataIndex: 'leavePlace',
      },
      {
        title: '结束时间',
        dataIndex: 'arriveTime',
      },
      {
        title: '结束地点',
        dataIndex: 'arrivePlace',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
    ];

    return (
      <PageHeaderWrapper title="司机详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="司机身份信息" style={{ marginBottom: 32 }}>
            <Description><img style={{width:110,height:110}} src={person.avatar}></img></Description>
            <Description term="司机姓名">{person.name}</Description>
            <Description term="性别">{person.sex}</Description>
            <Description term="年龄">{person.progress}</Description>
            <Description term="司机类别">{person.status}</Description>
            <Description term="联系电话">{person.phone}</Description>
            <Description term="家庭住址">{person.address}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>历史订单</div>
          <Table
            style={{ marginBottom: 24 }}
            dataSource={ordersData}
            columns={columns}
          />
        </Card>
        <Card>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DriverProfile;