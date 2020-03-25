import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List, Form} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserTestProfile.less';
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
  class UserTestProfile extends Component {
    constructor(props){
      super(props);
      this.state={
        data:{},
      };
  }

  componentDidMount(){

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

    var person={};
    try{

        var obj=this.props.location.state.list;
        for(var i in obj) {
            for(var j in obj[i]){
                if(strs[3]==obj[i].UserName)
                var id=obj[i].UserID;
            }
        }

        var tk=localStorage.getItem("token");
        fetch(`https://www.kingdom174.work/userDetail?token=${tk}&&userID=${id}`,
        {
          method:'GET', 
        })
        .then(res => res.json()
        )
        .then(
       res => {
         person=res;
         //接口暂不匹配
        //  if(person.Status){
        //    if(person.Status==1){
        //     person.Status="乘客";
        //    }
        //    if(person.Status==0){
        //     person.Status="司机";
        //    }
        //  }
         this.setState({
          data:person,
        })
         }
       );
    }catch(err){
      this.setState({
        data:nullobj,
      })
    }


  }

    render() {

    const columns = [
      {
        title: '订单ID',
        dataIndex: 'callNo',
        sorter: true,
        render: val => `${val}`,
        // mark to display a total number
        needTotal: true,
        render: text => <Link to={{pathname:`/ordermanage/orderdetail/${text}`,state:this.props.orderss}}>{text}</Link>
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
      <PageHeaderWrapper title="用户详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="用户身份信息" style={{ marginBottom: 32 }}>
            {/* <Description><img style={{width:110,height:110}} src={}></img></Description> */}
            <Description term="用户ID">{this.state.data.UserID}</Description>
            <Description term="用户姓名">{this.state.data.UserName}</Description>
            <Description term="性别">{this.state.data.Sex}</Description>
            <Description term="余额">{this.state.data.Balance}</Description>
            <Description term="用户类别">{this.state.data.Status}</Description>
            <Description term="联系电话">{this.state.data.PhoneNumber}</Description>

          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>历史订单</div>
          <Table
            style={{ marginBottom: 24 }}
            dataSource={this.state.data.order}
            columns={columns}
          />
        </Card>
        <Card>
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserTestProfile;