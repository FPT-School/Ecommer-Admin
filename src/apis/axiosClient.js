import axios from 'axios';
import { JODY } from 'config';
import { toast } from 'react-toastify';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const axiosClient = axios.create({
  baseURL: 'http://fresh-food.live',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(JODY);
    config.headers = {
      Authorization: `${accessToken || ''}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data;

    return response;
  },
  (error) => {
    const { response } = error;
    const { status, data } = response;
    // if (status === UNAUTHORIZED || status === FORBIDDEN) {
    // }
    toast.error(data.msg, {
      autoClose: 2000,
      theme: 'colored',
    });

    return Promise.reject(response);
  }
);
export default axiosClient;
