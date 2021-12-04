import axiosClient from './axiosClient';

const productApi = {
  get() {
    return axiosClient.get('/products');
  },
  getById(id) {
    return axiosClient.get(`/products/${id}`);
  },

  add(data) {
    return axiosClient.post('/products', data);
  },

  update(id, data) {
    return axiosClient.patch(`/products/${id}`, data);
  },
  remove(id) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export default productApi;
