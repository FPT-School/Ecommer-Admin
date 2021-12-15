import axiosClient from './axiosClient';

const orderApi = {
  get(params) {
    return axiosClient.get('/orders', { params });
  },
  getById(id) {
    return axiosClient.get(`/orders/${id}`);
  },

  add(data) {
    return axiosClient.post('/orders', data);
  },

  update(id, data) {
    return axiosClient.patch(`/orders/${id}`, data);
  },
  remove(id) {
    return axiosClient.delete(`/orders/${id}`);
  },
};

export default orderApi;
