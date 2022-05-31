import { makeAutoObservable } from "mobx";
import agent from "../Agent";

export default class FacultyStore {
  constructor() {
    makeAutoObservable(this);
  }

  getFacultyById = async (id: number) => {
    return await agent.Faculties.GetFacultyById(id);
  };
}
