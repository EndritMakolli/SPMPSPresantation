import { makeAutoObservable } from "mobx";
import agent from "../Agent";
import { FakeSchedules } from "../FakeData";
import { BusSchedule } from "../Types/BusSchedule";

export default class BusScheduleStore {
  schedules: BusSchedule[] | undefined;
  mode: "READ" | "CREATE" | "EDIT" | undefined;
  currentSchedule: BusSchedule | undefined;

  constructor() {
    makeAutoObservable(this);
    this.getSchedules();
  }

  getSchedules = async () => {
    setTimeout(() => {
      this.schedules = FakeSchedules;
      this.currentSchedule = this.schedules[0];
    }, 3000);
  };

  selectSchedule = (locationId: number) => {
    this.currentSchedule = this.schedules?.find(
      (sch) => sch.locationId === locationId
    );
  };
}
