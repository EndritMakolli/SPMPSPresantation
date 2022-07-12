import "./App.css";
import "./Style/CommonStyles.css";
import "./Style/Forms.css";
import "./Style/Tables.css";
import "./Style/Pagination.css";
import { Header } from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import { PersonalProfile } from "./Interfaces/PersonalProfile";
import { SemesterInformation } from "./Interfaces/Semester/Semester";
import RegisteredExams from "./Interfaces/Exams/RegisteredExams";
import ChooseFaculty from "./Interfaces/ChooseFaculty";
import RegisterExams from "./Interfaces/Exams/RegisterExams";
import ExamHistory from "./Interfaces/Exams/ExamHistory";
import Settings from "./Interfaces/Settings";
import { LoginPage } from "./Interfaces/LoginPage";
import StudentProfile from "./Interfaces/StudentProfile";
import StudentTranscript from "./Interfaces/Exams/StudentTranscript";
import Posts from "./Interfaces/Posts";
import { observer } from "mobx-react";
import { useStore } from "./Stores/Store";
import { ManageSystem } from "./Interfaces/ManageSystem";
import BusSchedule from "./Interfaces/BusSchedules/BusSchedule";
import "./Style/Columns.css";
import ManageStudents from "./Interfaces/ManageSystem/Students/ManageStudents";
import ManageAcademicStaffs from "./Interfaces/ManageSystem/AcademicStaffs/ManageAcademicStaffs";
import ManageAdministriveStaffs from "./Interfaces/ManageSystem/AdministratorStaffs/ManageAdministriveStaffs";
import ManageCourses from "./Interfaces/ManageSystem/Courses/ManageCourses";
import ManageLectureHalls from "./Interfaces/ManageSystem/LectureHalls/ManageLectureHalls";
import ManageGroups from "./Interfaces/ManageSystem/Groups/ManageGroups";
import { Loader } from "./Components/Loader";
import { FullPageLoader } from "./Components/FullPageLoader";
import GradeExams from "./Interfaces/Exams/GradeExams";
import AcademicStaffProfile from "./Interfaces/AcademicStaffProfile";
import StudentSchedule from "./Interfaces/Semester/StudentSchedule";

export default observer(function App() {
  const {
    loggedIn,
    getRole,
    currentFaculty,
    user,
    studentManager,
    academicManager,
    loginFailed,
  } = useStore().userStore;

  return (
    <div className="App">
      <div className="background"></div>
      {!loggedIn && !currentFaculty && !loginFailed && <FullPageLoader />}
      {!loggedIn && loginFailed && <LoginPage />}
      {loggedIn && !currentFaculty && <ChooseFaculty />}
      {loggedIn && currentFaculty && <Header role={getRole()} />}
      {loggedIn && currentFaculty && (
        <main>
          <Routes>
            <Route
              path="profile/personal"
              element={<PersonalProfile user={user!} />}
            />
            {studentManager && (
              <>
                <Route path="semester" element={<SemesterInformation />} />
                <Route
                  path="semester/studentschedule"
                  element={<StudentSchedule />}
                />
                <Route
                  path="exams/studentexams"
                  element={<RegisteredExams />}
                />
                <Route path="exams/registerexams" element={<RegisterExams />} />
                <Route path="exams/history" element={<ExamHistory />} />
                <Route path="profile/student" element={<StudentProfile />} />
                <Route
                  path="profile/transcript"
                  element={<StudentTranscript />}
                />
              </>
            )}
            {academicManager && (
              <>
                <Route path="exams/grading" element={<GradeExams />} />
                <Route
                  path="profile/academic"
                  element={<AcademicStaffProfile />}
                />
              </>
            )}
            <Route path="settings" element={<Settings />} />
            <Route path="admin" element={<ManageSystem />} />
            <Route path="posts" element={<Posts />} />
            <Route path="profile/buses" element={<BusSchedule />} />
            <Route path="admin/students" element={<ManageStudents />} />
            <Route path="admin/lecturers" element={<ManageAcademicStaffs />} />
            <Route
              path="admin/administrators"
              element={<ManageAdministriveStaffs />}
            />
            <Route path="admin/subjects" element={<ManageCourses />} />
            <Route path="admin/lecturegroups" element={<ManageGroups />} />
            <Route path="admin/lecturehalls" element={<ManageLectureHalls />} />
          </Routes>
        </main>
      )}
    </div>
  );
});
