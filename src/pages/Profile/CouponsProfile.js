import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './CouponsProfile.less';

const { Description } = DescriptionList;


class CouponsProfile extends Component {

  render() {
    const url=this.props.match.url;
    var strs = new Array(); //定义一数组
    strs = url.split("/"); //字符分割

    const nullobj={
      key:'',
      value:'',
      startTime:'',
      endTime:'',
      status:'',
      ownedNumber:'',
      usedNumber:'',
  };

  let coupon=[];
  try{
      var obj=this.props.location.state.data.list;
      for(var i in obj) {
          for(var j in obj[i]){
              if(strs[3]==obj[i].key)
              coupon=obj[i];
          }
      }
      if(coupon.status==0){
        coupon.status="司机";
      }
      else{
        coupon.status="乘客";
      }
  }catch(err){
    coupon=nullobj;
  }

    return (
      <PageHeaderWrapper title="优惠券详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="优惠券信息" style={{ marginBottom: 32 }}>
            <Description term="优惠券编号">{coupon.key}</Description>
            <Description term="优惠券金额">{coupon.value}</Description>
            <Description term="发放时间">{coupon.startTime}</Description>
            <Description term="截止时间">{coupon.endTime}</Description>
            <Description term="发放人群">{coupon.status}</Description>
            <Description term="发放人数">{coupon.ownedNumber}</Description>
            <Description term="使用人数">{coupon.usedNumber}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CouponsProfile;
