import { makeAutoObservable } from "mobx";
import agent from "../../Agent";
import { AcademicStaff } from "../../Types/AcademicStaff";
import { Course } from "../../Types/Course";
import { Faculty } from "../../Types/Faculty";
import { Grade } from "../../Types/Grade";
import { User } from "../../Types/User";
import { arrayToMap } from "../../utils";

export class AcademicManager {
  user: User;
  faculty: Faculty;
  academicStaff: AcademicStaff | undefined = undefined;
  exams: Map<number, Grade> | undefined;
  courses: Map<number, Course> | undefined;

  constructor(academicStaff: AcademicStaff, user: User, faculty: Faculty) {
    makeAutoObservable(this);
    this.academicStaff = academicStaff;
    this.user = user;
    this.faculty = faculty;
    this.loadData();
  }

  loadData = async () => {
    await Promise.all([this.loadExams(), this.loadCourses()]);
  };

  loadExams = async () => {
    try {
      const { data, status } = await agent.Users.Academic.GetExams(
        this.faculty.facultyID,
        this.user.id
      );

      if (status === 200) {
        this.exams = arrayToMap(data, "gradeId");
      }
    } catch (err) {
      console.log(err);
      console.log("Couldn't load exams for staff!");
    }
  };

  loadCourses = async () => {
    try {
      const { data, status } = await agent.Users.Academic.GetCourses(
        this.faculty.facultyID,
        this.user.id
      );

      if (status === 200) {
        this.courses = arrayToMap(data, "courseId");
      }
    } catch (err) {
      console.log(err);
      console.log("Couldn't load courses for staff!");
    }
  };

  getExams = () => {
    return Array.from(this.exams?.values()!);
  };

  getCourses = () => {
    return Array.from(this.courses?.values()!);
  };

  gradeStudent = async (gradeId: number, value: number) => {
    try {
      const { status } = await agent.Courses.GradeStudent({
        gradeId: gradeId,
        value: value,
        staffId: this.user.id,
      });
      if (status === 200) {
        alert("Graded!");
        let newExam = this.exams?.get(gradeId)!;
        newExam.value = value;
        this.exams?.set(gradeId, newExam);
      }
    } catch (err) {
      console.log(err);
      console.log("Couldn't grade student!");
    }
  };
}
