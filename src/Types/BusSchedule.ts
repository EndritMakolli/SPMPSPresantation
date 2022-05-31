export type BusSchedule = {
  locationId: number;
  locationName: string;
  departingPlace: string;
  departingPlaceURL: string;
  slots: BusScheduleSlot[];
};

export type BusScheduleSlot = {
  departTime: string;
  arrivalTime: string;
};
