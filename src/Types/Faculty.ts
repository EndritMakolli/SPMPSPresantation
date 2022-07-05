import { Level } from "./Level";
import { Major } from "./Major";

export type Faculty = {
  facultyID: number;
  facultyName: string;
  major: Major;
  level: Level;
};
