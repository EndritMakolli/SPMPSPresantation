import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import { fakeLectureHall } from "../FakeData";
import { Generation } from "../Types/Generation";
import { LectureHall } from "../Types/LectureHall";
import { arrayToMap } from "../utils";

interface ILectureHallStore {
  fetchLectureHalls: () => void;
  getLectureHalls: () => LectureHall[];
  selectLectureHall: (lectureHallId: string) => void;
  deselectLectureHall: () => void;
  deleteLectureHall: () => void;
  createLectureHall: () => void;
  updateLectureHall: () => void;
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

export default class LectureHallStore implements ILectureHallStore {
  lectureHalls = new Map<string, LectureHall>();
  filteredLectureHalls: LectureHall[] = [];
  currentLectureHall: LectureHall | undefined = undefined;
  mode: ViewModes = ViewModes.READ;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchLectureHalls();
  }

  fetchLectureHalls = async () => {
    //let facultyId = localStorage.getItem("facultyId");
    setTimeout(() => {
      runInAction(() => {
        this.lectureHalls = arrayToMap(
          [fakeLectureHall, fakeLectureHall],
          "lectureHallId"
        );
        this.loading = false;
        this.filteredLectureHalls = this.getLectureHalls();
      });
    }, 3000);
  };

  getLectureHalls = (): LectureHall[] => {
    return Array.from(this.lectureHalls.values());
  };

  selectLectureHall = (lectureHallId: string) => {
    this.currentLectureHall = this.lectureHalls.get(lectureHallId);
  };

  deselectLectureHall = () => {
    this.currentLectureHall = undefined;
  };

  deleteLectureHall = () => {
    this.lectureHalls.delete(this.currentLectureHall!.lectureHallId);
    this.filteredLectureHalls = this.getLectureHalls();
    this.deselectLectureHall();
  };

  updateLectureHall = () => {
    this.lectureHalls.set(
      this.currentLectureHall!.lectureHallId,
      this.currentLectureHall!
    );
    this.filteredLectureHalls = this.getLectureHalls();
  };

  updateCurrentLectureHall = (editedLectureHall: LectureHall) => {
    this.currentLectureHall = editedLectureHall;
  };

  createLectureHall = () => {
    this.currentLectureHall!.lectureHallId = v4();
    this.lectureHalls.set(
      this.currentLectureHall!.lectureHallId,
      this.currentLectureHall!
    );
    this.filteredLectureHalls = this.getLectureHalls();
  };

  setDefaultLectureHall = () => {
    this.currentLectureHall = {
      lectureHallId: "",
      lectureHallName: "",
      capacity: "",
      locationi: "",
    };
  };

  filterLectureHalls = (toMatch: string) => {
    this.filteredLectureHalls = this.getLectureHalls().filter((s) =>
      this.filterLogic(s, toMatch)
    );
  };

  filterLogic = (lectureHall: LectureHall, toMatch: string) => {
    for (const prop in lectureHall) {
      if (prop === "lectureHallId") continue;
      if (
        //@ts-ignore
        lectureHall[prop]
          .toString()
          .toLowerCase()
          .includes(toMatch.toLowerCase())
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
