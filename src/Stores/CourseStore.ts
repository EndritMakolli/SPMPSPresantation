import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import { fakeCourse } from "../FakeData";
import { Generation } from "../Types/Generation";
import { Course } from "../Types/Course";
import { arrayToMap } from "../utils";
import { Specialization } from "../Types/Specialization";
import { Semester } from "../Types/Semester";

interface ICourseStore {
  fetchCourses: () => void;
  getCourses: () => Course[];
  selectCourse: (courseId: string) => void;
  deselectCourse: () => void;
  deleteCourse: () => void;
  createCourse: () => void;
  updateCourse: () => void;
  inReadMode: () => boolean;
  inCreateMode: () => boolean;
  inDetailsMode: () => boolean;
  inEditMode: () => boolean;
}

export enum ViewModes {
  CREATE,
  DETAILS,
  EDIT,
  READ,
}

export default class CourseStore implements ICourseStore {
  courses = new Map<string, Course>();
  filteredCourses: Course[] = [];
  currentCourse: Course | undefined = undefined;
  mode: ViewModes = ViewModes.READ;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchCourses();
  }

  fetchCourses = async () => {
    //let facultyId = localStorage.getItem("facultyId");
    setTimeout(() => {
      runInAction(() => {
        this.courses = arrayToMap([fakeCourse, fakeCourse], "courseId");
        this.loading = false;
        this.filteredCourses = this.getCourses();
      });
    }, 3000);
  };

  getCourses = (): Course[] => {
    return Array.from(this.courses.values());
  };

  selectCourse = (courseId: string) => {
    this.currentCourse = this.courses.get(courseId);
  };

  deselectCourse = () => {
    this.currentCourse = undefined;
  };

  deleteCourse = () => {
    this.courses.delete(this.currentCourse!.courseId);
    this.filteredCourses = this.getCourses();
    this.deselectCourse();
  };

  updateCourse = () => {
    this.courses.set(this.currentCourse!.courseId, this.currentCourse!);
    this.filteredCourses = this.getCourses();
  };

  updateCurrentCourse = (editedCourse: Course) => {
    this.currentCourse = editedCourse;
  };

  createCourse = () => {
    this.currentCourse!.courseId = v4();
    this.courses.set(this.currentCourse!.courseId, this.currentCourse!);
    this.filteredCourses = this.getCourses();
  };

  setDefaultCourse = () => {
    this.currentCourse = {
      courseId: "",
      courseCode: "",
      courseName: "",
      ects: "",
      academicStaff: [],
      semester: {} as Semester,
      specializations: {} as Specialization,
      courseCategory: {
        categoryId: 0,
        categoryName: "",
      },
    };
  };
  filterCourses = (toMatch: string) => {
    this.filteredCourses = this.getCourses().filter((s) =>
      this.filterLogic(s, toMatch)
    );
  };

  filterLogic = (course: Course, toMatch: string) => {
    for (const prop in course) {
      if (prop === "courseId") continue;
      if (
        //@ts-ignore
        course[prop].toString().toLowerCase().includes(toMatch.toLowerCase())
      )
        return true;
    }
    return false;
  };

  setMode = (mode: ViewModes) => {
    this.mode = mode;
  };

  inReadMode = () => {
    return this.mode === ViewModes.READ;
  };

  inCreateMode = () => {
    return this.mode === ViewModes.CREATE;
  };

  inDetailsMode = () => {
    return this.mode === ViewModes.DETAILS;
  };

  inEditMode = () => {
    return this.mode === ViewModes.EDIT;
  };
}
