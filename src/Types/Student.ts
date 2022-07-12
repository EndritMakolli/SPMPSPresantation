import { Generation } from "./Generation";
import { Group } from "./Group";
import { Specialization } from "./Specialization";
import { User } from "./User";

export type Student = User & {
  studentId: string;
  fileNumber?: string;
  groups: Group[];
  specializations: Specialization[];
  generation: Generation;
  fullName?: string;
  lectureGroups?: number[];
};
