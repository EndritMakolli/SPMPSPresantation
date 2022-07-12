import { createContext, useContext } from "react";
import AcademicStaffStore from "./AcademicStaffStore";
import AdministriveStaffStore from "./AdministriveStaffStore";
import BusScheduleStore from "./BusScheduleStore";
import CourseStore from "./CourseStore";
import { ExamStore } from "./ExamsStore";
import GroupStore from "./GroupStore";
import LectureHallStore from "./LectureHallStore";
import StudentStore from "./StudentStore";
import UserStore from "./UserStore";

export const Store = {
  userStore: new UserStore(),
  busScheduleStore: new BusScheduleStore(),
  studentStore: new StudentStore(),
  academicStaffStore: new AcademicStaffStore(),
  administriveStaffStore: new AdministriveStaffStore(),
  courseStore: new CourseStore(),
  lectureHallStore: new LectureHallStore(),
  groupStore: new GroupStore(),
  examStore: new ExamStore(),
};

export const StoreContext = createContext(Store);

export function useStore() {
  return useContext(StoreContext);
}
