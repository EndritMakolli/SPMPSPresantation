import { AcademicStaff } from "./AcademicStaff";
import { CourseCategory } from "./CourseCategory";
import { Semester } from "./Semester";
import { Specialization } from "./Specialization";

export type Course = {
  courseId: string;
  courseCode: string;
  courseName: string;
  ects: string;
  academicStaff?: AcademicStaff[];
  semester?: Semester;
  specializations?: Specialization;
  courseCategory?: CourseCategory;
  lecturers?: AcademicStaff[];
};
