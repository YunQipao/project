import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, queryAdmin } from '@/services/api';

export default {
  namespace: 'couponsform',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *fetchAuthority({ payload }, { call, put }) {
      const response = yield call(queryAdmin, payload);
      yield put({
        type: 'saveAuthority',
        payload: response,
      }); 
    },
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },
  reducers: {
    saveAuthority(state, action) {
      return {
        ...state,
        ...action,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
