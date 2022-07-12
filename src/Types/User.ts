import { City } from "./City";
import { Country } from "./Country";
import { Role } from "./Role";

export type User = {
  id: string;
  firstName: string;
  surname: string;
  parentName: string;
  dateOfBirth: string;
  addressDetails: string;
  city: City;
  roleName: string;
  age: string;
  email: string;
  gender: string;
  personalNumber: string;
  dateRegistered: string;
  profilePictureURL: string;
  phoneNumber: string;
  country: Country;
  role?: Role;
};
