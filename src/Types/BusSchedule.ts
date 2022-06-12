export type BusSchedule = {
  busScheduleID: string;
  departingPlace: string;
  departingPlaceURL: string;
  slots: BusScheduleSlot[];
};

export type BusScheduleSlot = {
  slotId: string;
  departTimeFromPlace: string;
  departTimeFromFaculty: string;
};
