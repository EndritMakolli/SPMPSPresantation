import { Course } from "./Course";
import { GradeStatus } from "./GradeStatus";
import { Student } from "./Student";

export type Grade = {
  gradeId: number;
  value: number;
  dateGraded: string;
  student?: Student;
  status?: GradeStatus;
  course?: Course;
  professor?: GradeProfessor;
};

type GradeProfessor = {
  userId: string;
  fullName: string;
};
