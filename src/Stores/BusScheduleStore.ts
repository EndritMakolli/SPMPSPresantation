import { makeAutoObservable } from "mobx";
import { fakeLocations, FakeSchedules } from "../FakeData";
import { BusSchedule, BusScheduleSlot } from "../Types/BusSchedule";
import { Location } from "../Types/Location";
import { arrayToMap } from "../utils";

export default class BusScheduleStore {
  schedules = new Map<number, BusSchedule>();
  mode: "READ" | "CREATE" | "EDIT" | undefined = "READ";
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
      this.schedules = arrayToMap<BusSchedule>(FakeSchedules, "locationId");
      this.currentSchedule = this.schedules.get(1);
      this.isLoading = false;
    }, 1000);
  };

  isInSlotEditingMode = (): boolean => {
    return this.mode === "EDIT" && this.currentSlot !== undefined;
  };

  isInScheduleEditingMode = (): boolean => {
    return this.mode === "EDIT" && this.currentSchedule !== undefined;
  };

  isInSlotCreateMode = (): boolean => {
    return this.mode === "CREATE" && this.currentSlot?.slotId !== undefined;
  };

  /**
   * Checks whether the component is in schedule creation mode.
   * @returns true if bus schedule component is in create mode, false otherwise
   */

  isInScheduleCreateMode = (): boolean => {
    return (
      this.mode === "CREATE" &&
      (this.currentSchedule?.locationId === -1 || //Initially set to -1, can be changed from the dropdown
        this.schedules.get(this.currentSchedule!.locationId) === undefined) //Checks to see if the ID isn't in the schedules map
    );
  };

  isInMode = (mode: string): boolean => {
    return this.mode === mode;
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

  updateSchedule = (editedSchedule: BusSchedule) => {
    this.currentSchedule = editedSchedule;
  };

  /**
   * Deselects the current slot from the state.
   */

  deselectSlot = () => {
    this.currentSlot = undefined;
  };

  setSlotEditMode = (slotId: number) => {
    this.mode = "EDIT";
    this.selectSlot(slotId);
  };

  setReadMode = () => {
    this.mode = "READ";
    if (this.schedules.get(this.currentSchedule!.locationId) === undefined)
      this.selectSchedule();
    if (this.currentSlot) this.deselectSlot();
  };

  setSlotCreateMode = () => {
    this.mode = "CREATE";
    this.currentSlot = {
      slotId: Math.floor(Math.random() * 500),
      departTime: "",
      arrivalTime: "",
    };
  };

  setScheduleEditingMode = () => {
    this.mode = "EDIT";
  };

  setScheduleCreateMode = () => {
    this.mode = "CREATE";
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
