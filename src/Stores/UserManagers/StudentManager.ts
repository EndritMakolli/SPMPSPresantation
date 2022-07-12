import { makeAutoObservable } from "mobx";
import agent from "../../Agent";
import { Faculty } from "../../Types/Faculty";
import { Lecture } from "../../Types/Lecture";
import { LectureGroup } from "../../Types/LectureGroup";
import { Semester } from "../../Types/Semester";
import { Specialization } from "../../Types/Specialization";
import { Student } from "../../Types/Student";
import { User } from "../../Types/User";

export class StudentManager {
  student: Student | undefined = undefined;
  user: User | undefined = undefined;
  faculty: Faculty | undefined = undefined;
  registeredSemesters: Semester[] | undefined = undefined;
  specialization: Specialization | undefined = undefined;
  schedule: Lecture[] | undefined = undefined;
  lectureGroup: LectureGroup | undefined = undefined;

  constructor(student: Student, user: User, faculty: Faculty) {
    makeAutoObservable(this);
    this.student = student;
    this.user = user;
    this.faculty = faculty;
    this.loadStudentData();
  }

  loadStudentData = async () => {
    await Promise.all([
      this.fetchRegisteredSemesters(),
      this.fetchCurrentSpecialization(),
      this.fetchLectureGroup(),
      this.fetchSchedule(),
    ]).catch((error) => console.log(error));
  };

  fetchRegisteredSemesters = async () => {
    try {
      const { data, status } =
        await agent.Users.Students.GetAllRegisteredSemesters(
          this.user?.id!,
          this.faculty?.facultyID!
        );
      if (status === 200) {
        this.registeredSemesters = data;
      }
    } catch (e) {
      console.log("Error - couldn't load the student's registered semesters.");
    }
  };

  fetchCurrentSpecialization = async () => {
    try {
      let id = parseInt(this.getCurrentSpecialization().toString());
      const { data, status } =
        await agent.Courses.Specializations.GetSpecialization(id);
      if (status === 200) {
        this.specialization = data;
      }
    } catch (error) {
      console.log("Error - couldn't fetch the user's current specialization!");
    }
  };

  fetchSchedule = async () => {
    try {
      const { data, status } = await agent.LectureGroups.GetSchedule(
        this.student?.lectureGroups![0]!
      );
      if (status === 200) {
        this.schedule = data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchLectureGroup = async () => {
    try {
      const { data, status } = await agent.LectureGroups.GetGroup(
        this.student?.lectureGroups![0]!
      );
      if (status === 200) {
        this.lectureGroup = data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  getRegisteredSemesters = () => {
    return Array.from(this.registeredSemesters?.values()!);
  };

  /**
   * Sorts the current semester list in descending order and gets the first element, being the latest semester registered.
   * @returns a Semester object representing the latest semester the student has registered
   */
  getCurrentSemester = (): Semester => {
    return this.registeredSemesters!.sort(
      (a, b) => b.semesterID - a.semesterID
    )[0];
  };

  getCurrentSpecialization = (): Specialization => {
    return this.student!.specializations[0];
  };
}
