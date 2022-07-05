import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import { fakeAdministriveStaff } from "../FakeData";
import { Generation } from "../Types/Generation";
import { AdministriveStaff } from "../Types/AdministriveStaff";
import { arrayToMap } from "../utils";

interface IAdministriveStaffStore {
  fetchAdministriveStaffs: () => void;
  getAdministriveStaffs: () => AdministriveStaff[];
  selectAdministriveStaff: (userId: string) => void;
  deselectAdministriveStaff: () => void;
  deleteAdministriveStaff: () => void;
  createAdministriveStaff: () => void;
  updateAdministriveStaff: () => void;
  inReadMode: () => boolean;
  inCreateMode: () => boolean;
  inDetailsMode: () => boolean;
  inEditMode: () => boolean;
}

export enum ViewModes {
  CREATE,
  DETAILS,
  EDIT,
  READ,
}

export default class AdministriveStaffStore implements IAdministriveStaffStore {
  administriveStaffs = new Map<string, AdministriveStaff>();
  filteredAdministriveStaffs: AdministriveStaff[] = [];
  currentAdministriveStaff: AdministriveStaff | undefined = undefined;
  mode: ViewModes = ViewModes.READ;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchAdministriveStaffs();
  }

  fetchAdministriveStaffs = async () => {
    //let facultyId = localStorage.getItem("facultyId");
    setTimeout(() => {
      runInAction(() => {
        this.administriveStaffs = arrayToMap([fakeAdministriveStaff, fakeAdministriveStaff], "userId");
        this.loading = false;
        this.filteredAdministriveStaffs = this.getAdministriveStaffs();
      });
    }, 3000);
  };

  getAdministriveStaffs = (): AdministriveStaff[] => {
    return Array.from(this.administriveStaffs.values());
  };

  selectAdministriveStaff = (userId: string) => {
    this.currentAdministriveStaff = this.administriveStaffs.get(userId);
  };

  deselectAdministriveStaff = () => {
    this.currentAdministriveStaff = undefined;
  };

  deleteAdministriveStaff = () => {
    this.administriveStaffs.delete(this.currentAdministriveStaff!.userId);
    this.filteredAdministriveStaffs = this.getAdministriveStaffs();
    this.deselectAdministriveStaff();
  };

  updateAdministriveStaff = () => {
    this.administriveStaffs.set(this.currentAdministriveStaff!.userId, this.currentAdministriveStaff!);
    this.filteredAdministriveStaffs = this.getAdministriveStaffs();
  };

  updateCurrentAdministriveStaff = (editedAdministriveStaff: AdministriveStaff) => {
    this.currentAdministriveStaff = editedAdministriveStaff;
  };

  createAdministriveStaff = () => {
    this.currentAdministriveStaff!.userId = v4();
    this.administriveStaffs.set(this.currentAdministriveStaff!.userId, this.currentAdministriveStaff!);
    this.filteredAdministriveStaffs = this.getAdministriveStaffs();
  };

  setDefaultAdministriveStaff = () => {
    this.currentAdministriveStaff = {
      userId: "",
      firstName: "",
      lastName: "",
      parentName: "",
      birthday: "",
      address: "",
      city: "",
      role: "",
      age: "",
      email: "",
      gender: "",
      personalNumber: "",
      profilePictureUrl: "",
      telephone: "",
      country: "",
      zipCode: "",
      administriveStaffId: "",
    };
  };

  filterAdministriveStaffs = (toMatch: string) => {
    this.filteredAdministriveStaffs = this.getAdministriveStaffs().filter((s) =>
      this.filterLogic(s, toMatch)
    );
  };

  filterLogic = (administriveStaff: AdministriveStaff, toMatch: string) => {
    for (const prop in administriveStaff) {
      if (prop === "userId") continue;
      if (
        //@ts-ignore
        administriveStaff[prop].toString().toLowerCase().includes(toMatch.toLowerCase())
      )
        return true;
    }
    return false;
  };

  setMode = (mode: ViewModes) => {
    this.mode = mode;
  };

  inReadMode = () => {
    return this.mode === ViewModes.READ;
  };

  inCreateMode = () => {
    return this.mode === ViewModes.CREATE;
  };

  inDetailsMode = () => {
    return this.mode === ViewModes.DETAILS;
  };

  inEditMode = () => {
    return this.mode === ViewModes.EDIT;
  };
}


