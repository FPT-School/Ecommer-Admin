import axiosClient from './axiosClient';

const categoryApi = {
  get() {
    return axiosClient.get('/categorys');
  },
  getById(id) {
    return axiosClient.get(`/categorys/${id}`);
  },
  add(data) {
    return axiosClient.post('/categorys', data);
  },
  update(payload) {
    return axiosClient.patch(`/categorys/${payload.id}`, payload.data);
  },
  remove(id) {
    return axiosClient.delete(`/categorys/${id}`);
  },
};

export default categoryApi;
