import axiosClient from './axiosClient';

const orderItemApi = {
  get() {
    return axiosClient.get('/order-items');
  },
  getById(id) {
    return axiosClient.get(`/order-items/${id}`);
  },

  add(data) {
    return axiosClient.post('/order-items', data);
  },

  update(id, data) {
    return axiosClient.patch(`/order-items/${id}`, data);
  },
  remove(id) {
    return axiosClient.delete(`/order-items/${id}`);
  },
};

export default orderItemApi;
