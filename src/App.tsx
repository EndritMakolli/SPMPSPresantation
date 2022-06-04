import "./App.css";
import "./Style/CommonStyles.css";
import "./Style/Forms.css";
import "./Style/Tables.css";
import { Header } from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import { PersonalProfile } from "./Interfaces/PersonalProfile";
import { Semester } from "./Interfaces/Semester/Semester";
import { RegisteredExams } from "./Interfaces/Exams/RegisteredExams";
import ChooseFaculty from "./Interfaces/ChooseFaculty";
import { RegisterExams } from "./Interfaces/Exams/RegisterExams";
import { ExamHistory } from "./Interfaces/Exams/ExamHistory";
import { Settings } from "./Interfaces/Settings";
import { LoginPage } from "./Interfaces/LoginPage";
import { StudentProfile } from "./Interfaces/StudentProfile";
import { StudentTranscript } from "./Interfaces/Exams/StudentTranscript";
import { Posts } from "./Interfaces/Posts";
import { observer } from "mobx-react";
import { useStore } from "./Stores/Store";
import { ManageSystem } from "./Interfaces/ManageSystem";
import BusSchedule from "./Components/BusSchedules/BusSchedule";
import "./Style/Columns.css";

export default observer(function App() {
  const { loggedIn, role, faculty } = useStore().userStore;

  return (
    <div className="App">
      {!loggedIn && <LoginPage />}
      {loggedIn && !faculty && <ChooseFaculty />}
      {loggedIn && faculty && <Header role={role!} />}
      {loggedIn && faculty && (
        <main>
          <Routes>
            <Route path="profile/personal" element={<PersonalProfile />} />
            <Route path="semester" element={<Semester />} />
            <Route path="exams/studentexams" element={<RegisteredExams />} />
            <Route path="exams/registerexams" element={<RegisterExams />} />
            <Route path="exams/history" element={<ExamHistory />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile/student" element={<StudentProfile />} />
            <Route path="profile/transcript" element={<StudentTranscript />} />
            <Route path="admin" element={<ManageSystem />} />
            <Route path="posts" element={<Posts />} />
            <Route path="profile/buses" element={<BusSchedule />} />
          </Routes>
        </main>
      )}
    </div>
  );
});
