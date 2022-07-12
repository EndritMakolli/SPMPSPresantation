import { AcademicStaff } from "./AcademicStaff";
import { Course } from "./Course";
import { LectureHall } from "./LectureHall";

export type Lecture = {
  lectureId: number;
  startTime: string;
  endTime: string;
  lectureHall: LectureHall;
  course: Course;
  academicStaff: AcademicStaff;
};
