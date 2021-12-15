import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'config';
import { toast } from 'react-toastify';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const API_URL = 'https://ecommer-backend-g6sfl.ondigitalocean.app/api/';
// const API_URL = 'http://localhost:8080/api/';
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = () => {
  const refreshToken = localStorage.get(REFRESH_TOKEN) || '';

  return axios.post(`${API_URL}/auth/refresh-tokens`, {
    headers: {
      refresh_token: refreshToken,
    },
  });
};

axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN) || '';
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': config.isFormData
        ? 'multipart/form-data'
        : 'application/json',
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
  async (error) => {
    const { response } = error;
    const { status, data } = response;

    if (status === UNAUTHORIZED || status === FORBIDDEN) {
      localStorage.clear();
      window.location.reload();
      toast.error(data.msg, {
        autoClose: 2000,
        theme: 'colored',
      });
      // originalRequest._retry = true;
      // try {
      //   const res = await refreshAccessToken();
      //   console.log(res);
      //   // const { accessToken, refreshToken } = res.data.data;
      //   // axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
      //   // axios.defaults.headers.common.refresh_token = refreshToken;

      //   return axiosClient(originalRequest);
      // } catch (e) {
      //   localStorage.clear();
      //   window.location.reload();
      //   return Promise.reject(response);
      // }
    }

    toast.error(data.msg, {
      autoClose: 2000,
      theme: 'colored',
    });

    return Promise.reject(response);
  }
);
export default axiosClient;
