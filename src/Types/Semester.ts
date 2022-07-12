import { SemesterRegisteringSeason } from "./SemesterRegisteringSeason";

export type Semester = {
  semesterID: number;
  semesterName: string;
  season?: SemesterRegisteringSeason;
};
