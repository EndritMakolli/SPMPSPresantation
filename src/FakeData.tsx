import { BusSchedule } from "./Types/BusSchedule";

export const fakeStudent = {
  name: "Rilind",
  surname: "Bicaj",
};

export const FakeSchedules: BusSchedule[] = [
  {
    locationId: 1,
    locationName: "Prishtinë",
    departingPlace: "Rrethi me Flamur",
    departingPlaceURL: "sdfdsfs",
    slots: [
      {
        departTime: "09:00",
        arrivalTime: "09:30",
      },
      {
        departTime: "12:30",
        arrivalTime: "13:00",
      },
      {
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
        departTime: "08:00",
        arrivalTime: "08:30",
      },
      {
        departTime: "11:30",
        arrivalTime: "12:00",
      },
      {
        departTime: "14:10",
        arrivalTime: "14:40",
      },
    ],
  },
];
