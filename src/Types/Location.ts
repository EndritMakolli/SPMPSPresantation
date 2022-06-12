import { BusSchedule } from "./BusSchedule";

export type Location = {
  locationId: string;
  locationName: string;
  busSchedule?: BusSchedule;
};
