import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, List} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;
  class UserTest extends Component {
    constructor(props){
      super(props);
      this.state={
        data:[],
      };
  }

  componentDidMount(){

    var tk=localStorage.getItem("token");
    console.log(tk);

    fetch(`https://www.kingdom174.work/userlist?token=${tk}`,
     {
       method:'GET',
     })
     .then(res=>res.json())
     .then(res=>{
       console.log(res);
      this.setState({
      data:res
    })
     });
  }

    render() {
      
      const columns = [
        {
          title: '用户名',
          dataIndex: 'UserName',
          key: 'UserName',
        },
        {
          title: '性别',
          dataIndex: 'Sex',
          key: 'Sex',
        },
        {
          title: '类别',
          dataIndex: 'Status',
          key: 'Status',
        },
        {
          title: '余额',
          dataIndex: 'Balance',
          key: 'Balance',
        },
        {
          title: '地址',
          dataIndex: 'StaLocation',
          key: 'StaLocation',
        },
      ];
      

      // console.log(this.state.data[0]);
    return (
      <PageHeaderWrapper title="用户测试页">
        <Table dataSource={this.state.data} columns={columns} />;
      </PageHeaderWrapper>
    );
  }
}

export default UserTest;