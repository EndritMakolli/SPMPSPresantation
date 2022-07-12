import { Level } from "./Level";
import { Major } from "./Major";
import { Semester } from "./Semester";

export type Faculty = {
  facultyID: number;
  facultyName: string;
  major: Major;
  level: Level;
  semesters?: Semester[];
};
