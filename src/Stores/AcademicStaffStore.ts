import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import { fakeAcademicStaff } from "../FakeData";
import { Generation } from "../Types/Generation";
import { AcademicStaff } from "../Types/AcademicStaff";
import { arrayToMap } from "../utils";

interface IAcademicStaffStore {
  fetchAcademicStaffs: () => void;
  getAcademicStaffs: () => AcademicStaff[];
  selectAcademicStaff: (userId: string) => void;
  deselectAcademicStaff: () => void;
  deleteAcademicStaff: () => void;
  createAcademicStaff: () => void;
  updateAcademicStaff: () => void;
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

export default class AcademicStaffStore implements IAcademicStaffStore {
  academicStaffs = new Map<string, AcademicStaff>();
  filteredAcademicStaffs: AcademicStaff[] = [];
  currentAcademicStaff: AcademicStaff | undefined = undefined;
  mode: ViewModes = ViewModes.READ;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchAcademicStaffs();
  }

  fetchAcademicStaffs = async () => {
    //let facultyId = localStorage.getItem("facultyId");
    setTimeout(() => {
      runInAction(() => {
        this.academicStaffs = arrayToMap([fakeAcademicStaff, fakeAcademicStaff], "userId");
        this.loading = false;
        this.filteredAcademicStaffs = this.getAcademicStaffs();
      });
    }, 3000);
  };

  getAcademicStaffs = (): AcademicStaff[] => {
    return Array.from(this.academicStaffs.values());
  };

  selectAcademicStaff = (userId: string) => {
    this.currentAcademicStaff = this.academicStaffs.get(userId);
  };

  deselectAcademicStaff = () => {
    this.currentAcademicStaff = undefined;
  };

  deleteAcademicStaff = () => {
    this.academicStaffs.delete(this.currentAcademicStaff!.userId);
    this.filteredAcademicStaffs = this.getAcademicStaffs();
    this.deselectAcademicStaff();
  };

  updateAcademicStaff = () => {
    this.academicStaffs.set(this.currentAcademicStaff!.userId, this.currentAcademicStaff!);
    this.filteredAcademicStaffs = this.getAcademicStaffs();
  };

  updateCurrentAcademicStaff = (editedAcademicStaff: AcademicStaff) => {
    this.currentAcademicStaff = editedAcademicStaff;
  };

  createAcademicStaff = () => {
    this.currentAcademicStaff!.userId = v4();
    this.academicStaffs.set(this.currentAcademicStaff!.userId, this.currentAcademicStaff!);
    this.filteredAcademicStaffs = this.getAcademicStaffs();
  };

  setDefaultAcademicStaff = () => {
    this.currentAcademicStaff = {
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
      academicStaffId: "",
      academicLevels: [],
    };
  };

  filterAcademicStaffs = (toMatch: string) => {
    this.filteredAcademicStaffs = this.getAcademicStaffs().filter((s) =>
      this.filterLogic(s, toMatch)
    );
  };

  filterLogic = (academicStaff: AcademicStaff, toMatch: string) => {
    for (const prop in academicStaff) {
      if (prop === "userId") continue;
      if (
        //@ts-ignore
        academicStaff[prop].toString().toLowerCase().includes(toMatch.toLowerCase())
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
