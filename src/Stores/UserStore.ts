import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Agent";
import { Faculty } from "../Types/Faculty";
import { User } from "../Types/User";
import { PostsStore } from "./PostsStore";
import { AcademicManager } from "./UserManagers/AcademicManager";
import { SettingsStore } from "./UserManagers/SettingsStore";
import { StudentManager } from "./UserManagers/StudentManager";

export default class UserStore {
  loggedIn: boolean = false;
  currentFaculty: Faculty | undefined = undefined;
  user: User | undefined = undefined;
  studentManager: StudentManager | undefined;
  academicManager: AcademicManager | undefined;
  userSettings: SettingsStore | undefined = undefined;
  postsStore: PostsStore | undefined = undefined;
  registeredFaculties: Faculty[] | undefined = undefined;
  loading: boolean = false;
  loginFailed: boolean = false;

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
        this.postsStore = new PostsStore(
          this.user!,
          this.currentFaculty!,
          this.studentManager?.student
        );
        this.stoppedLoading();
      } else if (authStatus === 401) {
        alert("Cookie not yet set");
      }
    } catch (err) {
      setTimeout(() => (this.loginFailed = true), 1000); // Otherwise the loginpage will never show because of the loader
      console.log(err);
      this.stoppedLoading();
    }
  };

  loadUser = async (userId: string) => {
    try {
      const { data, status } = await agent.Users.GetUserById(userId);

      if (status === 200) {
        await this.setFacultyFromSession();
        runInAction(() => {
          this.user = data;
          this.loggedIn = true;
          this.userSettings = new SettingsStore(this.user);
          this.loadUserType();
        });
      } else if (status === 404) {
        console.log("User could not be queried");
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadUserType = async () => {
    switch (this.getRole()) {
      case "STUDENT":
        await this.loadStudent();
        break;
      case "ACADEMICSTAFF":
        await this.loadAcademicStaff();
        break;
    }
  };

  loadStudent = async () => {
    try {
      const { data, status } = await agent.Users.Students.GetStudentProfile(
        this.currentFaculty!.facultyID,
        this.user!.id
      );
      if (status === 200) {
        this.studentManager = new StudentManager(
          data,
          this.user!,
          this.currentFaculty!
        );
      }
    } catch (e) {
      console.log(e);
      console.log("Error - couldn't load student!");
    }
  };

  loadAcademicStaff = async () => {
    //here
    try {
      const { data, status } = await agent.Users.Academic.GetAcademicProfile(
        this.user!.id
      );
      console.log(status);
      if (status === 200) {
        this.academicManager = new AcademicManager(
          data,
          this.user!,
          this.currentFaculty!
        );
      }
    } catch (e) {
      console.log(e);
      console.log("Error - couldn't load academic staff!");
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
    if (!this.user?.id) return; //Checks whether the user is not set
    if (this.user?.id && this.currentFaculty) return; //Checks whether both the user and faculty are picked

    this.nowLoading();
    try {
      const { data, status } = await agent.Faculties.GetFacultiesForUser(
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
    setTimeout(() => (this.loginFailed = true), 2000); // Otherwise the loginpage will never show because of the loader
    this.user = {} as User;
    this.currentFaculty = undefined;
    this.registeredFaculties = undefined;
    localStorage.removeItem("currentFaculty");
  };

  logOut = async () => {
    let res = await agent.Authentication.LogOut();
    res.status === 200 ? this.clearSession() : alert("Error logging out!");
  };

  getRole = (): string => {
    return this.user!.role!.name.toUpperCase();
  };
}
