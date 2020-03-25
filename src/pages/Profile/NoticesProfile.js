import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './NoticesProfile.less';

const { Description } = DescriptionList;


class NoticesProfile extends Component {

  render() {
    const url=this.props.match.url;
    var strs = new Array(); //定义一数组
    strs = url.split("/"); //字符分割

    const nullobj={
      key:'',
      title:'',
      content:'',
      time:'',
  };

  let notice=[];
  try{
      var obj=this.props.location.state.data.list;
      for(var i in obj) {
          for(var j in obj[i]){
              if(strs[3]==obj[i].key)
              notice=obj[i];
          }
      }
  }catch(err){
      notice=nullobj;
  }

    return (
      <PageHeaderWrapper title="公告详情页">
        <Card bordered={false}>
           <DescriptionList size="large" title="公告信息" style={{ marginBottom: 32 }}>
            <Description term="公告序号">{notice.key}</Description>
            <Description term="公告标题">{notice.title}</Description>
            <Description term="公告内容">{notice.content}</Description>
            <Description term="发布时间">{notice.time}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NoticesProfile;
