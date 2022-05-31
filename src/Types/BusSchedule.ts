export type BusSchedule = {
  locationId: number;
  locationName: string;
  departingPlace: string;
  departingPlaceURL: string;
  slots: BusScheduleSlot[];
};

export type BusScheduleSlot = {
  slotId: number;
  departTime: string;
  arrivalTime: string;
};
