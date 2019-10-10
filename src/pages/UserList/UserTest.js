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

    return (
      <PageHeaderWrapper title="用户测试页">
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

export default UserTest;