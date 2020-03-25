import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryAdmin(params) {
  return request(`/api/adminlist?${stringify(params)}`);
}

export async function removeAdmin(params) {
  return request('/api/adminlist', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addAdmin(params) {
  return request('/api/adminlist', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateAdmin(params = {}) {
  return request(`/api/adminlist?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function testUser(params) {
  return request(`/api/userstest?${stringify(params)}`);
}

export async function queryUser(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function removeUser(params) {
  return request('/api/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params) {
  return request('/api/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params = {}) {
  return request(`/api/users?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}


export async function queryOrder(params) {
  return request(`/api/orders?${stringify(params)}`);
}

export async function removeOrder(params) {
  return request('/api/orders', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addOrder(params) {
  return request('/api/orders', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateOrder(params = {}) {
  return request(`/api/orders?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}


export async function queryDriver(params) {
  return request(`/api/driver?${stringify(params)}`);
}

export async function removeDriver(params) {
  return request('/api/driver', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDriver(params) {
  return request('/api/driver', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDriver(params = {}) {
  return request(`/api/driver?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryFeedback(params) {
  return request(`/api/feedback?${stringify(params)}`);
}

export async function removeFeedback(params) {
  return request('/api/feedback', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFeedback(params) {
  return request('/api/feedback', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFeedback(params = {}) {
  return request(`/api/feedback?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryNotice(params) {
  return request(`/api/notice?${stringify(params)}`);
}

export async function removeNotice(params) {
  return request('/api/notice', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addNotice(params) {
  return request('/api/notice', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateNotice(params = {}) {
  return request(`/api/notice?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryCoupons(params) {
  return request(`/api/coupons?${stringify(params)}`);
}

export async function removeCoupons(params) {
  return request('/api/coupons', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addCoupons(params) {
  return request('/api/coupons', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCoupons(params = {}) {
  return request(`/api/coupons?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeData() {
  return request('/api/fake_data');
}



export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryUserProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
