import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Faculty } from "./Types/Faculty";
import { User } from "./Types/User";

axios.defaults.withCredentials = true;

const urls = {
  auth: "http://localhost:5000/",
  fcm: "http://localhost:7000/",
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
  CookieLogin: async () =>
    requests.get<User>(urls.auth + "api/auth/demoGetUser"),
};

const Faculties = {
  GetFacultyById: async (id: number) =>
    requests.get<Faculty>(urls.fcm + "api/faculties/" + id),
  GetFacultiesForUser: async (userId: string) =>
    requests.get<Faculty[]>(
      urls.fcm + "api/faculties/GetFacultiesForUser/" + userId
    ),
};

const agent = {
  Authentication: Authentication,
  Faculties: Faculties,
};

export default agent;
