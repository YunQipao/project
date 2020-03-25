import { testUser, queryUser, removeUser, addUser, updateUser } from '@/services/api';

export default {
  namespace: 'users',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *test({ payload }, { call, put }) {
      const response = yield call(testUser, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      // console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      // console.log(payload);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
