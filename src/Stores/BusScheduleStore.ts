import { randomInt } from "crypto";
import { makeAutoObservable } from "mobx";
import agent from "../Agent";
import { FakeSchedules } from "../FakeData";
import { BusSchedule, BusScheduleSlot } from "../Types/BusSchedule";

export default class BusScheduleStore {
  schedules: BusSchedule[] | undefined;
  mode: "READ" | "CREATE" | "EDIT" | undefined = "READ";
  currentSchedule: BusSchedule | undefined;
  currentSlot: BusScheduleSlot | undefined;

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

  selectSlot = (slotId: number) => {
    this.currentSlot = this.currentSchedule?.slots.find(
      (slot) => slot.slotId === slotId
    );
  };

  updateSlot = (editedSlot: BusScheduleSlot) => {
    this.currentSlot = editedSlot;
  };

  deselectSlot = () => {
    this.currentSlot = undefined;
  };

  setEditMode = (slotId: number) => {
    this.mode = "EDIT";
    this.selectSlot(slotId);
  };

  setReadMode = () => {
    this.mode = "READ";
    this.deselectSlot();
  };

  setCreateMode = () => {
    this.mode = "CREATE";
    this.currentSlot = {
      slotId: Math.floor(Math.random() * 500),
      departTime: "",
      arrivalTime: "",
    };
  };

  deleteSlot = (slotId: number) => {
    this.currentSchedule!.slots = this.currentSchedule!.slots.filter(
      (slot) => slot.slotId !== slotId
    );
  };

  saveChangesToSlot = () => {
    this.deleteSlot(this.currentSlot!.slotId);
    this.currentSchedule!.slots.push(this.currentSlot!);
    //Sort the slots
    this.currentSchedule!.slots.sort((a, b) =>
      a.departTime.localeCompare(b.departTime)
    );
    this.setReadMode();
  };

  handleCloseButton = (slotId?: number) => {
    if (this.mode === "READ") {
      this.deleteSlot(slotId!);
    } else if (this.mode === "EDIT") {
      this.setReadMode();
    } else if (this.mode === "CREATE") {
      this.setReadMode();
    }
    //redundant 3rd if
  };
}
