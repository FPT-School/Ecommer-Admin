import axiosClient from './axiosClient';

const authApi = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  
  register(data) {
    return axiosClient.post('/auth/register', data);
  },

  forgotPassword(data) {
    return axiosClient.post('/auth/forgot-password', data);
  },

  logout() {
    return axiosClient.get('/auth/logout');
  },

  get(id) {},
  add(data) {},
  update(data) {},
  remove(id) {},
};

export default authApi;
