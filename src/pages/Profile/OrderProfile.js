import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './OrderProfile.less';

const { Description } = DescriptionList;


class OrderProfile extends Component {

  render() {
    const url=this.props.match.url;
    var strs = new Array(); //定义一数组
    strs = url.split("/"); //字符分割

    const nullobj={
      callNo:"",
      driverName:"",
      driverId:"",
      driverSex:"",
      driverAddress:"",
      driverAge:"",
      driverPhone:"",
      passengerName:"",
      passengerId:"",
      passengerSex:"",
      passengerAddress:"",
      passengerAge:"",
      passengerPhone:"",
      leaveTime:"",
      leavePlace:"",
      arriveTime:"",
      arrivePlace:"",
      price:"",
  };

  let order=[];
  try{
      var obj=this.props.location.state.data.list;
      for(var i in obj) {
          for(var j in obj[i]){
              if(strs[3]==obj[i].callNo)
              order=obj[i];
          }
      }
  }catch(err){
      order=nullobj;
  }

    return (
      <PageHeaderWrapper title="订单详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
            <Description term="订单编号">{order.callNo}</Description>
            <Description term="司机姓名">{order.driverName}</Description>
            <Description term="乘客姓名">{order.passengerName}</Description>
            <Description term="出发时间">{order.leaveTime}</Description>
            <Description term="出发地点">{order.leavePlace}</Description>
            <Description term="结束时间">{order.arriveTime}</Description>
            <Description term="结束地点">{order.arrivePlace}</Description>
            <Description term="价格">{order.price}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="司机信息" style={{ marginBottom: 32 }}>
            <Description term="司机ID">{order.driverId}</Description>
            <Description term="姓名">{order.driverName}</Description>
            <Description term="性别">{order.driverSex}</Description>
            <Description term="年龄">{order.driverAge}</Description>
            <Description term="联系电话">{order.driverPhone}</Description>
            <Description term="家庭住址">{order.driverAddress}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="乘客信息" style={{ marginBottom: 32 }}>
            <Description term="乘客ID">{order.passengerId}</Description>
            <Description term="姓名">{order.passengerName}</Description>
            <Description term="性别">{order.passengerSex}</Description>
            <Description term="年龄">{order.passengerAge}</Description>
            <Description term="联系电话">{order.passengerPhone}</Description>
            <Description term="家庭住址">{order.passengerAddress}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OrderProfile;
