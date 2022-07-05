import { Class } from "./Class";

export type Group = {
  groupId: string;
  groupName: string;
  seasonId?: number;
  timeSlot: string;
  classes: Class [];
};
