import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent";
import { BusSchedule, BusScheduleSlot } from "../Types/BusSchedule";
import { Location } from "../Types/Location";
import { arrayToMap } from "../utils";
import ObjectID from "bson-objectid";

export enum BusScheduleViewModes {
  CREATE_SCHEDULE,
  CREATE_SLOT,
  READ,
  EDIT_SLOT,
  EDIT_SCHEDULE,
}

export default class BusScheduleStore {
  schedules = new Map<string, BusSchedule>();
  mode: BusScheduleViewModes = BusScheduleViewModes.READ;
  locations = new Map<string, Location>();
  currentSchedule: BusSchedule | undefined;
  currentSlot: BusScheduleSlot | undefined;
  currentLocation: Location | undefined;
  previousSchedule: BusSchedule | undefined; // A cache of sorts
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  fetchData = async () => {
    await this.fetchLocations();
    await this.fetchSchedules();
    runInAction(() => {
      this.isLoading = false;
    });
  };

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

  getAssignedLocations = () => {
    return this.getLocations().filter(
      (loc) => this.schedules.get(loc.locationId) !== undefined
    );
  };

  getUnassignedLocations = () => {
    return this.getLocations().filter(
      (loc) => this.schedules.get(loc.locationId) === undefined
    );
  };

  fetchLocations = async () => {
    try {
      const { data, status } =
        await agent.Faculties.Locations.GetAllLocations();

      if (status === 200) {
        runInAction(() => {
          this.locations = arrayToMap(data, "locationId");
          this.currentLocation = this.getAssignedLocations()[0];
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fetches all bus schedules asychronously with Axios.
   */

  fetchSchedules = async () => {
    try {
      const { data, status } =
        await agent.Faculties.BusSchedules.GetAllSchedules();

      if (status === 200) {
        runInAction(() => {
          this.schedules = arrayToMap(data, "busScheduleID");
          this.currentSchedule = data[0];
          this.sortSlots();
          this.isLoading = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Sorts the schedule's slots based on their departing time from the assigned place.
   */

  sortSlots = () => {
    this.currentSchedule?.slots.sort((a, b) =>
      a.departTimeFromPlace.localeCompare(b.departTimeFromPlace)
    );
  };

  setMode = (mode: BusScheduleViewModes) => {
    this.mode = mode;
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

  isInScheduleCreateMode = (): boolean => {
    return this.mode === BusScheduleViewModes.CREATE_SCHEDULE;
  };

  /**
   * Sets the desired bus schedule as the current schedule being worked on.
   * If no parameter is sent, it selects the first schedule in the array.
   * @param {string} scheduleId - the ID of the schedule being selected.
   */

  selectSchedule = (scheduleId?: string) => {
    if (scheduleId) this.currentSchedule = this.schedules?.get(scheduleId);
    else this.currentSchedule = this.getSchedules()[0];
  };

  /**
   * Sets the desired slot as the current schedule slot being worked on.
   * @param slotId - the ID of the slot being selected.
   */

  selectSlot = (slotId: string) => {
    this.currentSlot = this.currentSchedule?.slots.find(
      (slot) => slot.slotId === slotId
    );
  };

  /**
   * Sets the current slot to a default, empty slot, with an ID.
   */

  setDefaultSlot = () => {
    this.currentSlot = {
      slotId: ObjectID().toHexString(),
      departTimeFromPlace: "",
      departTimeFromFaculty: "",
    };
  };

  /**
   * Sets the current schedule to a default, empty schedule, whose ID is the ID of the location it corresponds to.
   * @param selectedLocationId the ID of the location this schedule is for
   */

  setDefaultSchedule = (selectedLocationId: string) => {
    this.currentSchedule = {
      busScheduleID: selectedLocationId,
      departingPlace: "",
      departingPlaceURL: "",
      slots: [],
    };
  };

  /**
   * Updates the current selected slot with a modified version of it.
   * @param slot - the slot to replace the current one with
   */

  setCurrentSlot = (slot: BusScheduleSlot) => {
    this.currentSlot = slot;
  };

  setCurrentLocation = (location: Location) => {
    this.currentLocation = location;
  };

  setCurrentSchedule = (schedule: BusSchedule) => {
    this.currentSchedule = schedule;
  };

  setPreviousSchedule = (schedule: BusSchedule | undefined) => {
    this.previousSchedule = schedule;
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

  /**
   * Generates an empty bus schedule, whose ID is the ID of the default unassigned location.
   * @returns an empty Bus Schedule, with the default location's ID as its ID
   */

  newSchedule = (): BusSchedule => {
    return {
      busScheduleID: this.getUnassignedLocations()[0].locationId,
      slots: [],
      departingPlace: "",
      departingPlaceURL: "",
    };
  };

  deleteSlot = async (slotId: string) => {
    let updatedSchedule = this.currentSchedule;
    updatedSchedule!.slots = updatedSchedule!.slots.filter(
      (slot) => slot.slotId !== slotId
    ); //Delete the slot from the current schedule
    await this.updateSlots(updatedSchedule!); //Save changes
  };

  createSlot = async () => {
    let updatedSchedule = this.currentSchedule;
    updatedSchedule?.slots.push(this.currentSlot!);
    console.log(updatedSchedule);
    await this.updateSlots(updatedSchedule!);
  };

  editSlot = async () => {
    let updatedSchedule = this.currentSchedule;
    updatedSchedule!.slots = updatedSchedule!.slots.filter(
      (slot) => slot.slotId !== this.currentSlot?.slotId
    ); //Delete the old, unedited slot
    updatedSchedule!.slots.push(this.currentSlot!); //Add the edited slot back
    await this.updateSlots(updatedSchedule!);
  };

  /**
   * Updates the schedule's slots to accomodate any changes done to them, such as addition, modification, and deletion.
   * This only affects the schedule's slots, additional information is edited from another method.
   *
   * On success, also saves the changes locally.
   * @param updatedSchedule - the updated schedule object to replace the current one with
   * @returns a boolean promise incdicating whether updating the UI can proceed
   */

  updateSlots = async (updatedSchedule: BusSchedule) => {
    try {
      const { status } = await agent.Faculties.BusSchedules.UpdateScheduleSlots(
        updatedSchedule.busScheduleID,
        updatedSchedule
      );

      if (status === 200) {
        this.updateSchedule(updatedSchedule);
        this.sortSlots();
        this.mode = BusScheduleViewModes.READ;
        this.deselectSlot();
      }
    } catch (error) {
      console.log(error);
    }
  };

  createSchedule = async () => {
    try {
      const { status } = await agent.Faculties.BusSchedules.CreateBusSchedule(
        this.currentSchedule!
      );

      if (status === 200) {
        this.mode = BusScheduleViewModes.READ;
        this.currentLocation = undefined;
        this.schedules.set(
          this.currentSchedule!.busScheduleID,
          this.currentSchedule!
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Locally saves the changes done to the current schedule.
   * @param editedSchedule the changed schedule object to replace the current one with
   */

  updateSchedule = (editedSchedule: BusSchedule) => {
    this.currentSchedule = editedSchedule;
  };

  /**
   * Deletes the currently selected schedule. If the request succeeds, also deletes it locally.
   */

  deleteSchedule = async () => {
    try {
      const { status } = await agent.Faculties.BusSchedules.DeleteSchedule(
        this.currentSchedule!.busScheduleID
      );

      if (status === 200) {
        this.schedules.delete(this.currentSchedule!.busScheduleID);
        this.currentSchedule = this.getSchedules()[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateScheduleInformation = async () => {
    try {
      const { status } =
        await agent.Faculties.BusSchedules.UpdateScheduleInformation(
          this.currentSchedule!.busScheduleID,
          this.currentSchedule!
        );
      if (status === 200) {
        this.mode = BusScheduleViewModes.READ;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
