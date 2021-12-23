import axiosClient from './axiosClient';

const analysisApi = {
  getAllOrders(params) {
    return axiosClient.get('/analysis/price/order', { params });
  },

  analyticByModal(modal) {
    return axiosClient.get(`/analysis/${modal}`);
  },
};

export default analysisApi;
