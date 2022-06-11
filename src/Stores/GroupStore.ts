import { makeAutoObservable, runInAction } from "mobx";
import { v4 } from "uuid";
import { fakeGroup } from "../FakeData";
import { Generation } from "../Types/Generation";
import { Group } from "../Types/Group";
import { arrayToMap } from "../utils";

interface IGroupStore {
  fetchGroups: () => void;
  getGroups: () => Group[];
  selectGroup: (groupId: string) => void;
  deselectGroup: () => void;
  deleteGroup: () => void;
  createGroup: () => void;
  updateGroup: () => void;
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

export default class GroupStore implements IGroupStore {
  groups = new Map<string, Group>();
  filteredGroups: Group[] = [];
  currentGroup: Group | undefined = undefined;
  mode: ViewModes = ViewModes.READ;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchGroups();
  }

  fetchGroups = async () => {
    //let facultyId = localStorage.getItem("facultyId");
    setTimeout(() => {
      runInAction(() => {
        this.groups = arrayToMap([fakeGroup, fakeGroup], "groupId");
        this.loading = false;
        this.filteredGroups = this.getGroups();
      });
    }, 3000);
  };

  getGroups = (): Group[] => {
    return Array.from(this.groups.values());
  };

  selectGroup = (groupId: string) => {
    this.currentGroup = this.groups.get(groupId);
  };

  deselectGroup = () => {
    this.currentGroup = undefined;
  };

  deleteGroup = () => {
    this.groups.delete(this.currentGroup!.groupId);
    this.filteredGroups = this.getGroups();
    this.deselectGroup();
  };

  updateGroup = () => {
    this.groups.set(this.currentGroup!.groupId, this.currentGroup!);
    this.filteredGroups = this.getGroups();
  };

  updateCurrentGroup = (editedGroup: Group) => {
    this.currentGroup = editedGroup;
  };

  createGroup = () => {
    this.currentGroup!.groupId = v4();
    this.groups.set(this.currentGroup!.groupId, this.currentGroup!);
    this.filteredGroups = this.getGroups();
  };

  setDefaultGroup = () => {
    this.currentGroup = {
      groupId: "",
      groupName: "",
      seasonId: -1,
      timeSlot: "",
      classes: [],
    };
  };

  filterGroups = (toMatch: string) => {
    this.filteredGroups = this.getGroups().filter((s) =>
      this.filterLogic(s, toMatch)
    );
  };

  filterLogic = (group: Group, toMatch: string) => {
    for (const prop in group) {
      if (prop === "groupId") continue;
      if (
        //@ts-ignore
        group[prop].toString().toLowerCase().includes(toMatch.toLowerCase())
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



