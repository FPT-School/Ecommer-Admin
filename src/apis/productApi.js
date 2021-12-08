import axiosClient from './axiosClient';

const productApi = {
  get(params) {
    return axiosClient.get('/products', { params });
  },
  getById(id) {
    return axiosClient.get(`/products/${id}`);
  },

  add(data) {
    return axiosClient.post('/products', data);
  },

  update(payload) {
    return axiosClient.patch(`/products/${payload.id}`, payload.data);
  },
  remove(id) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export default productApi;
