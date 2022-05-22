import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.withCredentials = true;

const urls = {
  auth: "http://localhost:5000/",
};

const responseBody = <T>(response: AxiosResponse<T>) => response;

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axios.get<T>(url, config).then(responseBody),
  post: (url: string, obj: {}) => axios.post(url, obj).then(responseBody),
  put: (url: string, obj: {}) => axios.put(url, obj).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Authentication = {
  GenerateToken: async (credentials: {}) =>
    requests.post(urls.auth + "api/auth/login", credentials),
  LogOut: () => requests.post(urls.auth + "api/auth/logout", {}),
};

const agent = {
  Authentication: Authentication,
};

export default agent;
