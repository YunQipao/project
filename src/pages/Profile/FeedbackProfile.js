import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List, Form} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './FeedbackProfile.less';
import Link from 'umi/link';
import { PureComponent, Fragment } from 'react';
import { Router } from 'react-router';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';

const { Description } = DescriptionList;


  class FeedbackProfile extends Component {
    constructor(props){
      super(props);
      this.state={
        data:[],
      };
  }

  componentDidMount(){


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
        feedback:{
          id:'',
          title:'',
          content:'',
          time:'',
        }
    };

    let person=[];
    try{
        var obj=this.props.location.state.data.list;
        for(var i in obj) {
            for(var j in obj[i]){
                if(strs[3]==obj[i].feedback.id)
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

    return (
      <PageHeaderWrapper title="用户详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="用户身份信息" style={{ marginBottom: 32 }}>
            <Description><img style={{width:110,height:110}} src={person.avatar}></img></Description>
            <Description term="用户姓名">{person.name}</Description>
            <Description term="性别">{person.sex}</Description>
            <Description term="年龄">{person.progress}</Description>
            <Description term="用户类别">{person.status}</Description>
            <Description term="联系电话">{person.phone}</Description>
            <Description term="家庭住址">{person.address}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="用户反馈信息" style={{ marginBottom: 32 }}>
            <Description term="反馈编号">{person.feedback.id}</Description>
            <Description term="反馈标题">{person.feedback.title}</Description>
            <Description term="反馈内容">{person.feedback.content}</Description>
            <Description term="反馈时间">{person.feedback.time}</Description>
          </DescriptionList>
        </Card>
        <Card>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default FeedbackProfile;