import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent";
import { Faculty } from "../Types/Faculty";
import { User } from "../Types/User";

export default class UserStore {
  loggedIn: boolean = false;
  role: string | undefined = undefined;
  faculty: Faculty | undefined = undefined;
  user: User | undefined = undefined;
  userFaculties: Faculty[] | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.cookieLogin();
    this.setFacultyFromSession();
    this.getFacultiesForUser();
  }

  cookieLogin = async () => {
    await agent.Authentication.CookieLogin()
      .then((res) => {
        if (res.status === 200) {
          runInAction(() => {
            this.user = res.data;
            this.role = this.user?.role;
            this.loggedIn = true;
          });
        } else console.log("Bad Request!!!!");
      })
      .catch(() => console.log("Cookie login error!"));
  };

  setFacultyFromSession = async () => {
    let facultyIdString = localStorage.getItem("selectedFaculty");
    //console.log("facultyFromSession : " + facultyIdString);
    if (!facultyIdString) return;
    let faculty = await agent.Faculties.GetFacultyById(
      parseInt(facultyIdString)
    );
    faculty
      ? runInAction(() => (this.faculty = faculty.data))
      : console.log("Faculty assign failed");
  };

  setFaculty = (faculty: Faculty | undefined) => {
    runInAction(() => {
      this.faculty = faculty;
    });
    if (faculty)
      localStorage.setItem("selectedFaculty", faculty.facultyID.toString());
  };

  getFacultiesForUser = () => {
    //console.log("Current user : " + this.user?.userId);
    if (!this.user?.userId) return;
    if (this.user?.userId && this.faculty) return;
    //console.log("Inside method for faculties...");
    agent.Faculties.GetFacultiesForUser(this.user!.userId)
      .then((res) => {
        runInAction(() => (this.userFaculties = res.data));
      })
      .catch((err) => console.log("Error at faculty fetching!" + err));
  };

  logIn = async (user: {}) => {
    await agent.Authentication.GenerateToken(user)
      .then(() => this.cookieLogin())
      .catch(() => alert("Something went wrong!"));
  };

  clearSession = () => {
    this.loggedIn = false;
    this.role = "NONE";
    this.user = {} as User;
    this.faculty = undefined;
    this.userFaculties = undefined;
    localStorage.removeItem("selectedFaculty");
  };

  logOut = async () => {
    let res = await agent.Authentication.LogOut();
    res.status === 200 ? this.clearSession() : alert("Error logging out!");
  };
}
