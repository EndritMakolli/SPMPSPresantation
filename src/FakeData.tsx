import { BusSchedule } from "./Types/BusSchedule";
import { User } from "./Types/User";

export const fakeStudent: User = {
  userId: "ad19316c-5a76-4f00-91dd-429d5ab545cf",
  firstName: "Rilind",
  lastName: "Bicaj",
  parentName: "Sadik Bicaj",
  role: "STUDENT",
  city: "Istog",
  address: "Vrellë e Istogut, Rruga Tedeli, nr. 5",
  birthday: "22 Dhjetor, 2000",
  country: "Kosovë",
  zipCode: "30000",
  age: "21",
  personalNumber: "144156821",
  telephone: "+383 45 994 307",
  email: "rb47139@ubt-uni.net",
  gender: "Mashkull",
  profilePictureUrl:
    "https://www.outbackballooning.com.au/wp-content/uploads/2019/01/2.jpg",
};

export const fakeAdmin: User = {
  userId: "fbfc92f7-0c3c-42dc-96fc-c6bdf4e98933",
  firstName: "Filan",
  lastName: "Fisteku",
  role: "ADMIN",
  parentName: "Avdet Fisteku",
  city: "Gjakovë",
  address: "Rruga Teuta, C3H1, nr. 10",
  birthday: "13 Shkurt, 1988",
  country: "Kosovë",
  zipCode: "23000",
  age: "54",
  personalNumber: "109311231",
  telephone: "+383 44 112 808",
  email: "ffadmn@ubt-uni.net",
  gender: "Mashkull",
  profilePictureUrl:
    "https://images.squarespace-cdn.com/content/v1/5b14d6b9e17ba3952cac9f04/1529195603042-9ITIYY4D1VS00NETN01Q/image-asset.jpeg",
};

export const Users = [fakeStudent, fakeAdmin];

export const FakeSchedules: BusSchedule[] = [
  {
    locationId: 1,
    locationName: "Prishtinë",
    departingPlace: "Rrethi me Flamur",
    departingPlaceURL: "sdfdsfs",
    slots: [
      {
        slotId: 1,
        departTime: "09:00",
        arrivalTime: "09:30",
      },
      {
        slotId: 2,
        departTime: "12:30",
        arrivalTime: "13:00",
      },
      {
        slotId: 3,
        departTime: "15:10",
        arrivalTime: "15:40",
      },
    ],
  },
  {
    locationId: 2,
    locationName: "Gjilan",
    departingPlace: "Komuna e Gjilanit",
    departingPlaceURL: "sdfdsfs",
    slots: [
      {
        slotId: 1,
        departTime: "08:00",
        arrivalTime: "08:30",
      },
      {
        slotId: 2,
        departTime: "11:30",
        arrivalTime: "12:00",
      },
      {
        slotId: 3,
        departTime: "14:10",
        arrivalTime: "14:40",
      },
    ],
  },
];
