import React, { PureComponent, Fragment } from 'react';
import { Router } from 'react-router';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Checkbox,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdminList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

    // status是管理员账号是否启用的标志
    // type是管理员种类的标志
const statusMap = ['default', 'processing'];
const status = ['禁用', '启用'];
const typeMap = ['normal', 'super'];
const type = ['普通管理员', '超级管理员'];

//这是自定义组件，专门定制来为新建按钮服务，在这里即是专门添加管理员服务
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  //下面的modal组件中包含的是点击新建之后跳出面板的显示组件，在这里即是添加管理员面板
  //包括选择管理员类别，输入邮箱，输入用户名、输入密码（其中限制规则还未完善）
  return (
    <Modal
      destroyOnClose
      title="添加管理员"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
    <FormItem key="type" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
          {form.getFieldDecorator('type', {
            initialValue: '0',
          })(
            <RadioGroup>
              <Radio value="0">普通管理员</Radio>
              <Radio value="1">超级管理员</Radio>
            </RadioGroup>
          )}
        </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
        {form.getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入至少五个字符的邮箱！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
        {form.getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入至少五个字符的用户名！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('userpassword', {
          rules: [{ required: true, message: '请输入至少五个字符的密码！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

//这个updateForm即是为分配权限面板服务的class
@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);
    
    // 将这里的this.state修改成如下，分别是
    // 修改用户信息，创建优惠券，修改优惠券，创建公告，修改公告权限标志位
    this.state = {
      formVals: {
        modifyUser:false,
        createCoupon:false,
        modifyCoupon:false,
        createNotice:false,
        modifyNotice:false,
      },
    };

    //下面组件使用的格式
    this.formLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 15 },
    };
  }

  //点击确定后的处理函数函数
  handleOK = () => {
    const { form, handleUpdate, values } = this.props;
    const { formVals: oldValue } = this.state;
    //从values中取出account，username，userpassword,type,status这些管理员信息
    const {account,username,userpassword,type,status}=values;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 将values中取出的管理员信息和分配权限面板中的信息组合在一起
      const formVals = { ...fieldsValue, account,username,userpassword,type,status };
      this.setState(
        {
          formVals,
        },
        () => handleUpdate(formVals)
      );
    });
  };


  renderContent = (formVals) => {
    const { form } = this.props;
    //从this.props.values中取出当前的权限配置的值
    //用勾选框先显示已有的管理员的权限，同时获取勾选框的新状态
    const {permission}=this.props.values;
    return [
      <FormItem key="modifyUser" {...this.formLayout}>
         {form.getFieldDecorator('modifyUser')(
        <Checkbox defaultChecked={permission.modifyUser}>修改用户信息权限</Checkbox>
    )}</FormItem>,
      <FormItem key="createCoupon" {...this.formLayout}>
         {form.getFieldDecorator('createCoupon')(
        <Checkbox defaultChecked={permission.createCoupon}>创建新优惠券权限</Checkbox>
    )}</FormItem>,
      <FormItem key="modifyCoupon" {...this.formLayout}>
      {form.getFieldDecorator('modifyCoupon')(
     <Checkbox defaultChecked={permission.modifyCoupon}>修改优惠券信息权限</Checkbox>
     )}</FormItem>,
   <FormItem key="createNotice" {...this.formLayout}>
   {form.getFieldDecorator('createNotice')(
    <Checkbox defaultChecked={permission.createNotice}>发布新公告权限</Checkbox>
  )}</FormItem>,
    <FormItem key="modifyNotice" {...this.formLayout}>
      {form.getFieldDecorator('modifyNotice')(
      <Checkbox defaultChecked={permission.modifyNotice}>修改公告信息权限</Checkbox>
    )}</FormItem>,
    ];
  };

  //确认和取消按钮，分别由this.handleOK()，handleUpdateModalVisible(false, values)函数处理
  renderFooter = () => {
    const { handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="ok" type="primary" onClick={() => this.handleOK()}>
        确认
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { formVals } = this.state;

    // 分配权限的面板如下
    return (
      <Modal
        // width={640}
        // bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="分配权限"
        visible={updateModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >

        {this.renderContent(formVals)}
      </Modal>
    );
  }
}


/* eslint react/no-multi-comp:0 */
@connect(({ adminlist, loading }) => ({
  adminlist,
  loading: loading.models.adminlist,
}))
@Form.create()
class AdminList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminlist/fetch',
    });
  }
  
//管理员列表的columns，修改成需要的样子即可
//其中点击分配权限先由handleUpdateModalVisible(false, values)处理
//点击禁用由handleBan处理，但是还没写此函数
即是
  columns = [
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      sorter: true,
      render: val => `${val}`,
      // mark to display a total number
      needTotal: true,
    },
    {
        title: '角色',
        dataIndex: 'type',
        filters: [
          {
            text: type[0],
            value: 0,
          },
          {
            text: type[1],
            value: 1,
          },
        ],
        render(val) {
          return <Badge status={typeMap[val]} text={type[val]} />;
        },
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>分配权限</a>
            <Divider type="vertical" />
            <a onClick={()=>this.handleBan()}>禁用</a>
          </Fragment>
        ),
      },
  ];

  handleStandardTableChange = (pagination, filtersArg, sorter) => {

    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'adminlist/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'adminlist/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'adminlist/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'adminlist/fetch',
        payload: values,
      });
    });
  };

  //控制面板显示或者隐藏的函数
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  //控制分配权限面板显示或隐藏的函数
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleBan =()=>{
    console.log(status);
  }

  //处理确认添加管理员的函数
  handleAdd = fields => {
    const { dispatch } = this.props;
    //和服务器交互
    dispatch({
      type: 'adminlist/add', //namesapce为adminlist的文件中选用add方法
      payload: {
        desc: fields,        //传递的参数，在这里即是待添加的管理员信息
      },
    });
    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    //将handleOK函数中的配置面板值和选中的管理员信息传递给服务器
    // console.log(fields);fields是参数，包含配置面板的待传递的信息
    //和服务器交互
    dispatch({
      type: 'adminlist/update',  
      //在namesapce为adminlist的文件中即是models下的adminlist.js文件选用update方法
      payload: {
        query: formValues,
        body: {
          fields,  //body中传递参数，即是分配权限面板获取的信息
        },
      },
    });
    
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={5} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('callNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">普通管理员</Option>
                  <Option value="1">超级管理员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">禁用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      adminlist: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper title="权限管理页">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default AdminList;
