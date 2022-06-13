import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent";
import { Faculty } from "../Types/Faculty";
import { Student } from "../Types/Student";
import { User } from "../Types/User";

export default class UserStore {
  loggedIn: boolean = false;
  role: string | undefined;
  currentFaculty: Faculty | undefined = undefined;
  user: User | undefined = undefined;
  student: Student | undefined = undefined;
  registeredFaculties: Faculty[] | undefined = undefined;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.cookieLogin();
    this.setFacultyFromSession();
    this.getFacultiesForUser();
  }

  cookieLogin = async () => {
    this.nowLoading();
    try {
      const { data: userId, status: authStatus } =
        await agent.Authentication.GetUserId();

      if (authStatus === 200) {
        await this.loadUser(userId);
        this.stoppedLoading();
      } else if (authStatus === 401) {
        alert("Cookie not yet set");
      }
    } catch (err) {
      console.log(err);
      this.stoppedLoading();
    }
  };

  loadUser = async (userId: string) => {
    try {
      const { data, status } = await agent.Users.GetUserById(userId);

      if (status === 200) {
        runInAction(() => {
          this.user = data;
          //this.user = fakeAdmin;
          this.role = data.roleName;
          //this.role = "ADMIN";

          this.loggedIn = true;
        });
      } else if (status === 404) {
        console.log("User could not be queried");
      }
    } catch (err) {
      console.log(err);
    }
  };

  nowLoading = () => {
    this.loading = true;
  };

  stoppedLoading = () => {
    this.loading = false;
  };

  getFacultyFromLocalStorage = () => {
    let facultyId = localStorage.getItem("currentFaculty");
    if (facultyId === null) console.log("Faculty not set in storage");
    else return parseInt(facultyId);
  };

  setFacultyFromSession = async () => {
    this.nowLoading();
    try {
      let facultyId = this.getFacultyFromLocalStorage();

      if (facultyId) {
        const { data, status } = await agent.Faculties.GetFacultyById(
          facultyId
        );

        if (status === 200) {
          runInAction(() => {
            this.currentFaculty = data;
          });
          this.stoppedLoading();
        } else if (status === 404) {
          console.log("Queried faculty wasn't found");
        }
      } else console.log("Faculty not set, cannot query!");
    } catch (error) {
      console.log(error);
    }
  };

  setPickedFaculty = (faculty: Faculty) => {
    runInAction(() => {
      this.currentFaculty = faculty;
    });
    localStorage.setItem("currentFaculty", faculty.facultyID.toString());
  };

  deselectFaculty = () => {
    this.currentFaculty = undefined;
  };

  getFacultiesForUser = async () => {
    //@ts-ignore
    if (!this.user?.id) return; //Checks whether the user is not set
    //@ts-ignore
    if (this.user?.id && this.currentFaculty) return; //Checks whether both the user and faculty are picked

    this.nowLoading();
    try {
      const { data, status } = await agent.Faculties.GetFacultiesForUser(
        //@ts-ignore
        this.user.id
      );
      if (status === 200) {
        runInAction(() => {
          this.registeredFaculties = data;
        });
        this.stoppedLoading();
      }
    } catch (error) {
      console.log(error);
    }
  };

  logIn = async (user: {}) => {
    let success = await agent.Authentication.GenerateToken(user)
      .then((res) => res.status === 200)
      .catch(() => alert("Something went wrong!"));

    if (success) {
      await this.cookieLogin();
    }
  };

  clearSession = () => {
    this.loggedIn = false;
    this.role = "NONE";
    this.user = {} as User;
    this.currentFaculty = undefined;
    this.registeredFaculties = undefined;
    localStorage.removeItem("currentFaculty");
  };

  logOut = async () => {
    let res = await agent.Authentication.LogOut();
    res.status === 200 ? this.clearSession() : alert("Error logging out!");
  };
}
