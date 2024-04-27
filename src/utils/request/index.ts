import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from "element-plus";
import route from '@/plugins/router'

const service: AxiosInstance = axios.create({
  withCredentials: false,
  timeout: 10 * 60 * 1000, // 请求超时时间
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const getToken = window.window.localStorage.getItem('user_token');
    if (getToken) {
      config!.headers!.Authorization = unref(`Bearer ${getToken}`) ?? '';
    } else {
      config!.headers.uuid = window.window.localStorage.getItem('unlogin_uuid');
    }
    config!.headers.timezone = new Date().getTimezoneOffset() / 60
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    console.log('response', response);
    console.log(res);
    if (response.headers.uuid) {
      const unloginUUid = response.headers.uuid === 'None' ? '' : response.headers.uuid;
      window.window.localStorage.setItem('unlogin_uuid', unloginUUid);
    }
    if (response.status !== 200) {
      ElMessage(res.msg);
      return Promise.reject(res.msg || 'Error');
    } else if (res.errCode === 2030) {
      route.push('/login');
      return Promise.reject(res.msg || 'Error');
    } else {
      return Promise.resolve(res);
    }
  },
  (error: AxiosError) => {
    console.log('err' + error);
    ElMessage(error.message);
    return Promise.reject(error.message);
  },
);

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

export default service;
