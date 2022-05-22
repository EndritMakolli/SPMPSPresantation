import { makeAutoObservable } from "mobx";
import agent from "../Agent";

export default class UserStore {
  loggedIn: boolean = false;
  role: string | undefined = undefined;
  faculty: {} | undefined = undefined;
  user: {} | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  logIn = async (user: {}) => {
    await agent.Authentication.GenerateToken(user)
      .then(() => this.getUserByToken())
      .catch(() => alert("Something went wrong!"));
  };

  getUserByToken = async () => {
    this.loggedIn = true;
    this.role = "STUDENT";
    this.user = {};
  };

  clearSession = () => {
    this.loggedIn = false;
    this.role = "NONE";
    this.user = {};
  };

  logOut = async () => {
    let res = await agent.Authentication.LogOut();
    res.status === 200 ? this.clearSession() : alert("Error logging out!");
  };
}
