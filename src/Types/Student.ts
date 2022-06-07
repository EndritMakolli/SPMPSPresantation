import { Generation } from "./Generation";
import { Group } from "./Group";
import { Specialization } from "./Specialization";

export type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  parentName: string;
  birthday: string;
  address: string;
  city: string;
  role: string;
  age: string;
  email: string;
  gender: string;
  personalNumber: string;
  profilePictureUrl: string;
  telephone: string;
  country: string;
  zipCode: string;
  studentId: string;
  groups: Group[];
  specializations: Specialization[];
  generation: Generation;
};
