import { Course } from "./Course";
import { LectureHall } from "./LectureHall";

export type Class = {
    classId: number;
    startingTime: string;
    endingTime: string;
    lectureHall: LectureHall;
    course: Course;
  };
  