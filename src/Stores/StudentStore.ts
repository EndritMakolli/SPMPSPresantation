import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import { fakeStudent } from "../FakeData";
import { Generation } from "../Types/Generation";
import { Student } from "../Types/Student";
import { arrayToMap } from "../utils";

interface IStudentStore {
  fetchStudents: () => void;
  getStudents: () => Student[];
  selectStudent: (userId: string) => void;
  deselectStudent: () => void;
  deleteStudent: () => void;
  createStudent: () => void;
  updateStudent: () => void;
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

export default class StudentStore implements IStudentStore {
  students = new Map<string, Student>();
  filteredStudents: Student[] = [];
  currentStudent: Student | undefined = undefined;
  mode: ViewModes = ViewModes.READ;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchStudents();
  }

  fetchStudents = async () => {
    //let facultyId = localStorage.getItem("facultyId");
    setTimeout(() => {
      runInAction(() => {
        this.students = arrayToMap([fakeStudent, fakeStudent], "userId");
        this.loading = false;
        this.filteredStudents = this.getStudents();
      });
    }, 3000);
  };

  getStudents = (): Student[] => {
    return Array.from(this.students.values());
  };

  selectStudent = (userId: string) => {
    this.currentStudent = this.students.get(userId);
  };

  deselectStudent = () => {
    this.currentStudent = undefined;
  };

  deleteStudent = () => {
    this.students.delete(this.currentStudent!.userId);
    this.filteredStudents = this.getStudents();
    this.deselectStudent();
  };

  updateStudent = () => {
    this.students.set(this.currentStudent!.userId, this.currentStudent!);
    this.filteredStudents = this.getStudents();
  };

  updateCurrentStudent = (editedStudent: Student) => {
    this.currentStudent = editedStudent;
  };

  createStudent = () => {
    this.currentStudent!.userId = v4();
    this.students.set(this.currentStudent!.userId, this.currentStudent!);
    this.filteredStudents = this.getStudents();
  };

  setDefaultStudent = () => {
    this.currentStudent = {
      userId: "",
      firstName: "",
      lastName: "",
      parentName: "",
      birthday: "",
      address: "",
      city: "",
      role: "",
      age: "",
      email: "",
      gender: "",
      personalNumber: "",
      profilePictureUrl: "",
      telephone: "",
      country: "",
      zipCode: "",
      studentId: "",
      groups: [],
      specializations: [],
      generation: {} as Generation,
    };
  };

  filterStudents = (toMatch: string) => {
    this.filteredStudents = this.getStudents().filter((s) =>
      this.filterLogic(s, toMatch)
    );
  };

  filterLogic = (student: Student, toMatch: string) => {
    for (const prop in student) {
      if (prop === "userId") continue;
      if (
        //@ts-ignore
        student[prop].toString().toLowerCase().includes(toMatch.toLowerCase())
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
