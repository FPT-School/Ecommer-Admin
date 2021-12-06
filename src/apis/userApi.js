import axiosClient from './axiosClient';

const userApi = {
  get(params) {
    return axiosClient.get('/users', { params });
  },

  getById(id) {
    return axiosClient.get(`/users/${id}`);
  },

  add(data) {
    return axiosClient.post('/users', data);
  },

  update(payload) {
    return axiosClient.patch(`/users/${payload.id}`, payload.data);
  },

  remove(id) {
    return axiosClient.delete(`/users/${id}`);
  },
};

export default userApi;
