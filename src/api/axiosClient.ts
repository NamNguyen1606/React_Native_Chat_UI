import axios from 'axios';
import queryString from 'query-string';
// const URL: string = 'http://192.168.1.83:5035/api/';
const URL = 'https://pscchattest.azurewebsites.net/api';
const AxiosClient = axios.create({
  baseURL: URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(async (config) => config);

AxiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

export default AxiosClient;
