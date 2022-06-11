import { AcademicStaff } from "./AcademicStaff";
import { Semester } from "./Semester";
import { Specialization } from "./Specialization";

export type Course = {
    courseId: string;
    courseCode: string;
    courseName: string;
    ECTS: string;
    academicStaff: AcademicStaff[];
    semester: Semester;
    specializations: Specialization;
    courseCategory: string;
  };
  