import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserProfile.less';

const { Description } = DescriptionList;
  class UserProfile extends Component {
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
        </Card>
        <Card>
        {this.state.data[0]}<br/>
          {this.state.data[1]}<br/>
          {this.state.data[2]}<br/>
          {this.state.data[3]}<br/>
          {this.state.data[4]}<br/>
          {this.state.data[5]}<br/>
          {this.state.data[6]}<br/>
          {this.state.data[7]}<br/>
          {this.state.data[8]}<br/>
          {this.state.data[9]}<br/>
          {this.state.data[10]}<br/>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserProfile;