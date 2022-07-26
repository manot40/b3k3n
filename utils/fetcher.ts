import axios, { type AxiosResponse } from 'axios';

const baseURL = '/api';

axios.defaults.baseURL = baseURL;

const fetcher = {
  get: <R = any>(url: string, params?: { [key: string]: any }): Promise<Res<R>> =>
    axios.get(url, { params }).then(handleResponse),
  post: <R = any, T = unknown>(url: string, data: T): Promise<Res<R>> =>
    axios.post(url, data).then(handleResponse),
  put: <R = any, T = unknown>(url: string, data: T): Promise<Res<R>> =>
    axios.put(url, data).then(handleResponse),
  patch: <R = any, T = unknown>(url: string, data: T): Promise<Res<R>> =>
    axios.patch(url, data).then(handleResponse),
  delete: <R = any>(url: string): Promise<Res<R>> =>
    axios.delete(url).then(handleResponse),
  setHeader(key: string, value: string) {
    axios.defaults.headers.common[key] = value;
    return this;
  },
};

function handleResponse(res: AxiosResponse) {
  const token = res.headers['x-access-token'];
  if (token) axios.defaults.headers.common['Authorization'] = token;
  return { ...res.data, status: res.status };
}

export default fetcher;
