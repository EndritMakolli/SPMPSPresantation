import { makeAutoObservable, runInAction } from "mobx";
import { fakeLocations, FakeSchedules } from "../FakeData";
import { BusSchedule, BusScheduleSlot } from "../Types/BusSchedule";
import { Location } from "../Types/Location";
import { arrayToMap } from "../utils";

export enum BusScheduleViewModes {
  CREATE_SCHEDULE,
  CREATE_SLOT,
  READ,
  EDIT_SLOT,
  EDIT_SCHEDULE,
}

export default class BusScheduleStore {
  schedules = new Map<number, BusSchedule>();
  mode: BusScheduleViewModes = BusScheduleViewModes.READ;
  locations: Map<number, Location> = arrayToMap<Location>(
    fakeLocations,
    "locationId"
  );
  currentSchedule: BusSchedule | undefined;
  currentSlot: BusScheduleSlot | undefined;
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchSchedules();
  }

  /**
   * Return all recorded schedules as ana array.
   * @returns {BusSchedule[]} An array of bus schedules.
   */

  getSchedules = () => {
    return Array.from(this.schedules.values());
  };

  getLocations = () => {
    return Array.from(this.locations.values());
  };

  getLocationsFromSchedules = (): Location[] => {
    return Array.from(
      this.getSchedules().map((sch) => {
        return {
          locationId: sch.locationId,
          locationName: sch.locationName,
        };
      })
    );
  };

  getUnassignedLocations = () => {
    return this.getLocations().filter(
      (loc) => this.schedules.get(loc.locationId) === undefined
    );
  };

  /**
   * Fetches all bus schedules asychronously with Axios.
   */

  fetchSchedules = async () => {
    setTimeout(() => {
      runInAction(() => {
        this.schedules = arrayToMap<BusSchedule>(FakeSchedules, "locationId");
        this.currentSchedule = this.schedules.get(1);
        this.isLoading = false;
      });
    }, 1000);
  };

  isInSlotEditingMode = (): boolean => {
    return this.mode === BusScheduleViewModes.EDIT_SLOT;
  };

  isInScheduleEditingMode = (): boolean => {
    return this.mode === BusScheduleViewModes.EDIT_SCHEDULE;
  };

  isInSlotCreateMode = (): boolean => {
    return this.mode === BusScheduleViewModes.CREATE_SLOT;
  };

  /**
   * Checks whether the component is in schedule creation mode.
   * @returns true if bus schedule component is in create mode, false otherwise
   */

  isInScheduleCreateMode = (): boolean => {
    return this.mode === BusScheduleViewModes.CREATE_SCHEDULE;
  };

  /**
   * Sets the desired bus schedule as the current schedule being worked on.
   * @param {number} scheduleId - the ID of the schedule being selected.
   */

  selectSchedule = (scheduleId?: number) => {
    if (scheduleId) this.currentSchedule = this.schedules?.get(scheduleId);
    else this.currentSchedule = this.getSchedules()[0];
  };

  /**
   * Sets the desired slot as the current schedule slot being worked on.
   * @param slotId - the ID of the slot being selected.
   */

  selectSlot = (slotId: number) => {
    this.currentSlot = this.currentSchedule?.slots.find(
      (slot) => slot.slotId === slotId
    );
  };

  /**
   * Updates the current selected slot with a modified version of it.
   * @param editedSlot - the modified bus schedule slot
   */

  updateSlot = (editedSlot: BusScheduleSlot) => {
    this.currentSlot = editedSlot;
  };

  /**
   * Saves the changes done to the current schedule.
   * @param editedSchedule the changed schedule object to replace the current one with
   */

  updateSchedule = (editedSchedule: BusSchedule) => {
    this.currentSchedule = editedSchedule;
  };

  /**
   * Deletes the currently selected schedule, selects the next schedule to show.
   */

  deleteSchedule = () => {
    this.schedules.delete(this.currentSchedule!.locationId);
    this.currentSchedule = this.getSchedules()[0];
  };

  /**
   * Checks whether there are any registered bus schedules in the store.
   * @returns true if there's available schedules, false otherwise
   */

  hasSchedules = () => {
    return this.schedules.size !== 0;
  };

  /**
   * Deselects the current slot from the state.
   */

  deselectSlot = () => {
    this.currentSlot = undefined;
  };

  setSlotEditMode = (slotId: number) => {
    this.mode = BusScheduleViewModes.EDIT_SLOT;
    this.selectSlot(slotId);
  };

  setReadMode = () => {
    this.mode = BusScheduleViewModes.READ;
    if (this.schedules.get(this.currentSchedule!.locationId) === undefined)
      this.selectSchedule();
    if (this.currentSlot) this.deselectSlot();
  };

  setSlotCreateMode = () => {
    this.mode = BusScheduleViewModes.CREATE_SLOT;
    this.currentSlot = {
      slotId: Math.floor(Math.random() * 500),
      departTime: "",
      arrivalTime: "",
    };
  };

  setScheduleEditingMode = () => {
    this.mode = BusScheduleViewModes.EDIT_SCHEDULE;
  };

  setScheduleCreateMode = () => {
    this.mode = BusScheduleViewModes.CREATE_SCHEDULE;
    this.currentSchedule = {
      locationId: this.getUnassignedLocations()[0].locationId,
      locationName: this.getUnassignedLocations()[0].locationName,
      slots: [],
      departingPlace: "",
      departingPlaceURL: "",
    };
  };

  deleteSlot = (slotId: number) => {
    this.currentSchedule!.slots = this.currentSchedule!.slots.filter(
      (slot) => slot.slotId !== slotId
    );
  };

  createSchedule = () => {
    this.schedules.set(this.currentSchedule!.locationId, this.currentSchedule!);
    this.setReadMode();
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
}
