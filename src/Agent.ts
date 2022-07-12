import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { request } from "http";
import { url } from "inspector";
import { AcademicStaff } from "./Types/AcademicStaff";
import { BusSchedule } from "./Types/BusSchedule";
import { Course } from "./Types/Course";
import { ExamSeason } from "./Types/ExamSeason";
import { Faculty } from "./Types/Faculty";
import { Grade } from "./Types/Grade";
import { Lecture } from "./Types/Lecture";
import { LectureGroup } from "./Types/LectureGroup";
import { Location } from "./Types/Location";
import { Post } from "./Types/Post";
import { Semester } from "./Types/Semester";
import { Specialization } from "./Types/Specialization";
import { Student } from "./Types/Student";
import { User } from "./Types/User";

axios.defaults.withCredentials = true;

const urls = {
  auth: "http://localhost:5000/",
  fcm: "http://localhost:7000/",
  usr: "http://localhost:9000/",
  crs: "http://localhost:8000/api/coursesservice/",
  pst: "http://localhost:6001/api/postsservice/",
  lcg: "http://localhost:4000/api/",
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
  post: <T>(url: string, obj: {}) => axios.post<T>(url, obj).then(responseBody),
  put: <T>(url: string, obj: {}) => axios.put<T>(url, obj).then(responseBody),
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
  Students: {
    GetStudentProfile: async (facultyId: number, userId: string) =>
      requests.get<Student>(
        urls.usr +
          "api/Students/getStudentForFaculty/" +
          facultyId +
          "/" +
          userId
      ),
    GetAllRegisteredSemesters: async (studentId: string, facultyId: number) =>
      requests.get<Semester[]>(
        urls.fcm +
          "api/RegisteredSemesters/getRegisteredSemesterInFacultyForStudent/" +
          studentId +
          "/" +
          facultyId
      ),
  },
  Academic: {
    GetAcademicProfile: async (userId: string) =>
      requests.get<AcademicStaff>(urls.usr + "api/academicstaff/" + userId),
    GetExams: async (facultyId: number, userId: string) =>
      requests.get<Grade[]>(
        urls.crs +
          "Grades/examsRegisteredForProfessor/" +
          facultyId +
          "/" +
          userId
      ),
    GetCourses: async (facultyId: number, userId: string) =>
      requests.get<Course[]>(
        urls.crs + "Courses/getCoursesForLecturer/" + facultyId + "/" + userId
      ),
  },
};

const Courses = {
  GenerateTranscript: async (userId: string, facultyId: number) =>
    requests.get<Grade[]>(
      urls.crs + "Grades/generateTranscript/" + facultyId + "/" + userId
    ),
  GetRegisteredExams: async (userId: string, facultyId: number) =>
    requests.post<Grade[]>(urls.crs + "Grades/getCurrentlyRegisteredExams", {
      studentId: userId,
      facultyId: facultyId,
    }),
  GetCurrentSeason: async (facultyId: number) =>
    requests.get<ExamSeason>(
      urls.crs + "Grades/currentlyOpenedExamSeason/" + facultyId
    ),
  RefuseGrade: async (gradeId: number, userId: string) =>
    requests.put(urls.crs + "Grades/refuseGrade", {
      gradeId: gradeId,
      userId: userId,
    }),
  CancelExamRegistration: async (gradeId: number, userId: string) =>
    requests.delete(
      urls.crs + "Grades/cancelExamRegistration/" + gradeId + "/" + userId
    ),
  GetRegisterableExams: async (
    studentId: string,
    semesterId: string,
    specializationId: number
  ) =>
    requests.post<Course[]>(urls.crs + "Courses/getRegisterableExams", {
      studentId: studentId,
      specializationId: specializationId,
      currentSemesterId: semesterId,
    }),
  RegisterExam: async (obj: {}) =>
    requests.post(urls.crs + "Grades/registerExam", obj),
  GetExamHistory: async (userId: string, facultyId: number) =>
    requests.get<ExamSeason[]>(
      urls.crs + "Grades/examHistory/" + facultyId + "/" + userId
    ),
  GradeStudent: async (obj: {}) =>
    requests.put(urls.crs + "Grades/gradeStudent", obj),
  Specializations: {
    GetSpecialization: async (id: number) =>
      requests.get<Specialization>(urls.crs + "Specializations/" + id),
  },
};

const Posts = {
  SubscribeToEmails: async (userId: string) =>
    requests.get(urls.pst + "Posts/SubscribeToEmails/" + userId),
  CheckIfSubscribed: async (userId: string) =>
    requests.get<boolean>(urls.pst + "Posts/GetUserSubscription/" + userId),
  GetAllPosts: async () => requests.get<Post[]>(urls.pst + "Posts/getallposts"),
};

const LectureGroups = {
  GetSchedule: async (groupId: number) =>
    requests.get<Lecture[]>(urls.lcg + "lecturegroups/schedule/" + groupId),
  GetGroup: async (groupId: number) =>
    requests.get<LectureGroup>(urls.lcg + "lecturegroups/" + groupId),
};

const agent = {
  Authentication: Authentication,
  Faculties: Faculties,
  Users: Users,
  Courses: Courses,
  Posts: Posts,
  LectureGroups: LectureGroups,
};

export default agent;
