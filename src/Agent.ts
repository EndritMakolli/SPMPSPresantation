import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BusSchedule } from "./Types/BusSchedule";
import { Faculty } from "./Types/Faculty";
import { Location } from "./Types/Location";
import { User } from "./Types/User";

axios.defaults.withCredentials = true;

const urls = {
  auth: "http://localhost:5000/",
  fcm: "http://localhost:7000/",
  usr: "http://localhost:9000/",
};

type Response<T> = {
  data: T;
  status: number;
};

const responseBody = <T>(response: AxiosResponse<T>): Response<T> => {
  return { data: response.data, status: response.status };
};

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
  GetUserId: async () =>
    requests.get<string>(urls.auth + "api/auth/getIdClaim"),
};

const Faculties = {
  GetFacultyById: async (id: number) =>
    requests.get<Faculty>(urls.fcm + "api/faculties/" + id),
  GetFacultiesForUser: async (userId: string) =>
    requests.get<Faculty[]>(
      urls.fcm + "api/faculties/GetFacultiesForUser/" + userId
    ),
  BusSchedules: {
    GetAllSchedules: async () =>
      requests.get<BusSchedule[]>(urls.fcm + "api/busschedules"),
    UpdateScheduleInformation: async (
      scheduleId: string,
      schedule: BusSchedule
    ) =>
      requests.put(
        urls.fcm + "api/busschedules/updateInformation/" + scheduleId,
        schedule
      ),
    UpdateScheduleSlots: async (scheduleId: string, schedule: BusSchedule) =>
      requests.put(
        urls.fcm + "api/busschedules/updateSlots/" + scheduleId,
        schedule
      ),
    CreateBusSchedule: async (busSchedule: BusSchedule) =>
      requests.post(
        urls.fcm + "api/busschedules/" + busSchedule.busScheduleID,
        busSchedule
      ),
    DeleteSchedule: async (scheduleId: string) =>
      requests.delete(urls.fcm + "api/busschedules/" + scheduleId),
  },
  Locations: {
    GetAllLocations: async () =>
      requests.get<Location[]>(urls.fcm + "api/locations"),
    UpdateLocation: async (location: Location) =>
      requests.put(urls.fcm + "api/locations/" + location.locationId, location),
  },
};

const Users = {
  GetUserById: async (userId: string) =>
    requests.get<User>(urls.usr + "api/Users/" + userId),
};

const agent = {
  Authentication: Authentication,
  Faculties: Faculties,
  Users: Users,
};

export default agent;
