import { makeAutoObservable } from "mobx";
import agent from "../Agent";
import { Course } from "../Types/Course";
import { ExamSeason } from "../Types/ExamSeason";
import { Grade } from "../Types/Grade";
import { arrayToMap } from "../utils";

type RegisteredExamsRequest = {
  userId: string;
  facultyId: number;
};

type RegisterableExamsRequest = {
  studentId: string;
  semesterId: number;
  specializationId: number;
};

export class ExamStore {
  transcript: Map<number, Grade> | undefined = undefined;
  examHistory: Map<number, ExamSeason> | undefined = undefined;
  registerableExams: Map<number, Course> | undefined = undefined;
  registeredExams: Map<number, Grade> | undefined = undefined;
  currentSeason: ExamSeason | undefined = undefined;
  registeredExamsRequestCache: RegisteredExamsRequest =
    {} as RegisteredExamsRequest;
  registerableExamsRequestCache: RegisterableExamsRequest =
    {} as RegisterableExamsRequest;
  selectedLecturers: Map<number, string> | undefined = undefined;
  seasonLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchCurrentSeason();
  }

  seasonOpen = () => {
    return this.currentSeason?.status.statusId === 1;
  };

  fetchCurrentSeason = async () => {
    let faculty = localStorage.getItem("currentFaculty");

    let facultyId = faculty ? parseInt(faculty) : -1;
    try {
      const { data, status } = await agent.Courses.GetCurrentSeason(facultyId);
      if (status === 200) {
        this.currentSeason = data;
        this.seasonLoaded = true;
      }
    } catch (error) {}
  };

  fetchExamHistory = async (userId: string) => {
    let faculty = localStorage.getItem("currentFaculty");

    let facultyId = faculty ? parseInt(faculty) : -1;
    try {
      const { data, status } = await agent.Courses.GetExamHistory(
        userId,
        facultyId
      );
      if (status === 200) {
        this.examHistory = arrayToMap(data, "examSeasonId");
      }
    } catch (err) {
      console.log("Error - could not load exam history.");
    }
  };

  getExamHistory = () => {
    return Array.from(this.examHistory!.values());
  };

  fetchTranscript = async (userId: string, faculty: number) => {
    try {
      const { data, status } = await agent.Courses.GenerateTranscript(
        userId!,
        faculty!
      );
      if (status === 200) {
        this.transcript = arrayToMap(data, "gradeId");
      }
    } catch (error) {
      console.log(error);
      alert("Couldn't generate transcript!");
    }
  };

  getTranscript = (): Grade[] => {
    return Array.from(this.transcript!.values());
  };

  fetchRegisteredExams = async (userId: string, faculty: number) => {
    try {
      const { data, status } = await agent.Courses.GetRegisteredExams(
        userId!,
        faculty!
      );
      if (status === 200) {
        this.registeredExams = arrayToMap(data, "gradeId");
        this.registeredExamsRequestCache = {
          userId: userId,
          facultyId: faculty,
        };
      }
    } catch (error) {
      console.log(error);
      alert("Couldn't get registered exams!");
    }
  };

  fetchRegisterableExams = async (
    studentId: string,
    semesterId: string,
    specializationId: number
  ) => {
    try {
      const { data, status } = await agent.Courses.GetRegisterableExams(
        studentId,
        semesterId,
        specializationId
      );
      if (status === 200) {
        this.registerableExams = arrayToMap(data, "courseId");
        this.loadSelectedLecturers();
        console.log(this.selectedLecturers);
        this.registerableExamsRequestCache = {
          studentId: studentId,
          semesterId: parseInt(semesterId),
          specializationId: specializationId,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadSelectedLecturers = () => {
    this.selectedLecturers = new Map<number, string>();
    this.getRegisterableExams().forEach((e) =>
      this.selectedLecturers!.set(parseInt(e.courseId), e.lecturers![0].userId)
    );
  };

  getRegisterableExams = () => {
    return Array.from(this.registerableExams!.values());
  };

  getRegisteredExams = () => {
    return Array.from(this.registeredExams!.values());
  };

  refuseGrade = async (gradeId: number, userId: string) => {
    try {
      const { status } = await agent.Courses.RefuseGrade(gradeId, userId);
      if (status === 200) {
        alert("grade refused successfully");
        let refusedGrade = this.registeredExams?.get(gradeId);
        refusedGrade!.status! = {
          statusId: 2,
          statusName: "Refuzuar",
        };
        this.registeredExams?.set(gradeId, refusedGrade!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  registerExam = async (
    userId: string,
    courseId: number,
    facultyId: number
  ) => {
    try {
      let data = {
        studentId: userId,
        courseId: courseId,
        facultyId: facultyId,
        lecturerId: this.selectedLecturers!.get(courseId),
      };
      console.log(data);
      const { status } = await agent.Courses.RegisterExam(data);
      if (status === 200) {
        alert("Exam registered!");
        this.registerableExams?.delete(courseId);
        await this.reloadRegisteredExams();
      }
    } catch (err) {
      console.log(err);
    }
  };

  cancelExamRegistration = async (gradeId: number, userId: string) => {
    try {
      const { status } = await agent.Courses.CancelExamRegistration(
        gradeId,
        userId
      );
      if (status === 200) {
        alert("Exam registration cancelled successfully");
        this.registeredExams?.delete(gradeId);
        await this.reloadRegisterableExams();
      }
    } catch (error) {
      console.log(error);
    }
  };

  reloadRegisterableExams = async () => {
    try {
      const { studentId, semesterId, specializationId } =
        this.registerableExamsRequestCache;
      const { data, status } = await agent.Courses.GetRegisterableExams(
        studentId,
        semesterId.toString(),
        specializationId
      );
      if (status === 200) {
        this.registerableExams = arrayToMap(data, "courseId");
        this.loadSelectedLecturers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  reloadRegisteredExams = async () => {
    try {
      const { userId, facultyId } = this.registeredExamsRequestCache;
      console.log("reloadRegisterdExams : " + userId + " /// " + facultyId);
      const { data, status } = await agent.Courses.GetRegisteredExams(
        userId,
        facultyId
      );
      if (status === 200) {
        this.registeredExams = arrayToMap(data, "gradeId");
      }
    } catch (error) {
      console.log("Error - could not reload registerable exams.");
    }
  };

  getSelectedLecturers = () => {
    return this.selectedLecturers;
  };
}
