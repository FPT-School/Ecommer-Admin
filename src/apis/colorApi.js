import axiosClient from './axiosClient';

const colorApi = {
  get() {
    return axiosClient.get('/colors');
  },
  getById(id) {
    return axiosClient.get(`/colors/${id}`);
  },
  add(data) {
    return axiosClient.post('/colors', data);
  },
  update(payload) {
    return axiosClient.patch(`/colors/${payload.id}`, payload.data);
  },
  remove(id) {
    return axiosClient.delete(`/colors/${id}`);
  },
};

export default colorApi;
