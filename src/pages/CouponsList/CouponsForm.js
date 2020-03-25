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
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, couponsform}) => ({
  couponsform,
  submitting: loading.effects['form/submitRegularForm'],
  loading: loading.models.couponsform,
}))
@Form.create()
class CouponsForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    const user=localStorage.getItem("user");
    const list = this.props.couponsform.payload.list;
    for(let i in list){
      if(list[i].username==user){
        if(list[i].permission.createCoupon===false){
          message.error('权限不足');
        }
        if(list[i].permission.createCoupon===true){
          form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              dispatch({
                type: 'couponsform/submitRegularForm',
                payload: values,
              });
            }
          });
        }
      }
    }
  };

    componentDidMount(){
      const {dispatch}=this.props;
      dispatch({
        type: 'couponsform/fetchAuthority',
        payload: {},
      });
    }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.coupons.title" />}
        content={<FormattedMessage id="app.forms.coupons.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.status.label" />}

            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="form.status.radio.driver" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="form.status.radio.passenger" />
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="form.value.label" />
                </span>
              }
            >
              {getFieldDecorator('weight')(
                <InputNumber
                  placeholder={formatMessage({ id: 'form.value.placeholder' })}
                  min={0}
                  max={100}
                />
              )}
            <span className="ant-form-text">￥</span>

               <span style={{marginRight:30}}></span>
               
              <span>  
                  <FormattedMessage id="form.owned.label" />
                </span>
              {getFieldDecorator('weights')(
                <InputNumber
                  placeholder={formatMessage({ id: 'form.owned.placeholder' })}
                  min={0}
                  max={100}
                />
              )}
              <span className="ant-form-text">人</span>

            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.coupons.date.label" />}>
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
                    formatMessage({ id: 'form.coupons.date.placeholder.start' }),
                    formatMessage({ id: 'form.coupons.date.placeholder.end' }),
                  ]}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.desc.label" />}>
              {getFieldDecorator('standard')(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.desc.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
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

export default CouponsForms;
