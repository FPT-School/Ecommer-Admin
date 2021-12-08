import axiosClient from './axiosClient';

const productApi = {
  get() {
    return axiosClient.get('/image-products');
  },

  getById(id) {
    return axiosClient.get(`/image-products/${id}`);
  },

  add(data) {
    return axiosClient.post('/image-products', data, { isFormData: true });
  },

  update(id, data) {
    return axiosClient.patch(`/image-products/${id}`, data);
  },

  remove(id) {
    return axiosClient.delete(`/image-products/${id}`);
  },
};

export default productApi;
