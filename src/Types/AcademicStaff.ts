import { AcademicLevel } from "./AcademicLevel";

export type AcademicStaff = {
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
  academicStaffId: string;
  academicLevels: AcademicLevel[];
  fullName?: string;
  academicLevel?: AcademicLevel;
};
