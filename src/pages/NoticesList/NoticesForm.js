import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['noticeform/submitRegularForm'],
}))
@Form.create()
class NoticesForm extends PureComponent {
  //提交表单函数
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      //console.log(values);
      //values如{title: "萨达奥所大所", date: Array(2), goal: "阿达", standard: "阿萨德大多"}
      if (!err) {
        dispatch({
          type: 'noticeform/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
//this.props为以下内容form: {getFieldsValue: ƒ, getFieldValue: ƒ, getFieldInstance: ƒ, setFieldsValue: ƒ, setFields: ƒ, …}
// match: {path: "/noticemanage/noticeform", url: "/noticemanage/noticeform", isExact: true, params: {…}}
// location: {pathname: "/noticemanage/noticeform", search: "", hash: "", query: {…}, state: undefined, …}
// history: {length: 6, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
// staticContext: undefined
// computedMatch: {path: "/noticemanage/noticeform", url: "/noticemanage/noticeform", isExact: true, params: {…}}
// route: {path: "/noticemanage/noticeform", name: "noticeform", exact: true, component: ƒ}
// children: null
// submitting: undefined
// dispatch: ƒ (action)
// __proto__: Object
//console.log(this.props);
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;


    //表单格式控制
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    //提交格式控制
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      //页头
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.notice.title" />}
        content={<FormattedMessage id="app.forms.notice.description" />}
      >
        {/* 以下是表单项 */}
        <Card bordered={false}>
          {/* 表单绑定提交函数 */}
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            {/* 以下是通知标题 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.notice.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.notice.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.notice.title.placeholder' })} />)}
            </FormItem>
              {/* 以下是通知日期选择栏 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label" />}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.date.required' }),
                  },
                ],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={[
                    formatMessage({ id: 'form.date.placeholder.start' }),
                    formatMessage({ id: 'form.date.placeholder.end' }),
                  ]}
                />
              )}
            </FormItem>
            {/* 以下是通知内容栏 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.content.label" />}>
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.content.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.content.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            {/* 以下是通知附加说明 */}
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.notice.desc.label" />}>
              {getFieldDecorator('standard')(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.notice.desc.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>
            {/* 提交和保存按钮 */}
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              {/* 提交按钮 */}
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              {/* 保存按钮 */}
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NoticesForm;
