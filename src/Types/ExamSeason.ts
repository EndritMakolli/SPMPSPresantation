import { ExamSeasonStatus } from "./ExamSeasonStatus";
import { Grade } from "./Grade";

export type ExamSeason = {
  examSeasonId: number;
  description: string;
  startDate: string;
  endDate: string;
  faculty: number;
  status: ExamSeasonStatus;
  grades?: Grade[];
};
