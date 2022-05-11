import { useState } from "react";
import "./App.css";
import "./Style/CommonStyles.css";
import "./Style/Forms.css";
import "./Style/Tables.css";
import { Header } from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import { PersonalProfile } from "./Interfaces/PersonalProfile";
import { Semester } from "./Interfaces/Semester/Semester";
import { RegisteredExams } from "./Interfaces/Exams/RegisteredExams";
import { ChooseFaculty } from "./Interfaces/ChooseFaculty";
import { RegisterExams } from "./Interfaces/Exams/RegisterExams";
import { ExamHistory } from "./Interfaces/Exams/ExamHistory";
import { Settings } from "./Interfaces/Settings";
import { LoginPage } from "./Interfaces/LoginPage";
import { StudentProfile } from "./Interfaces/StudentProfile";
import { StudentTranscript } from "./Interfaces/Exams/StudentTranscript";
import { Posts } from "./Interfaces/Posts";

function App() {
  const [role, setRole] = useState("NONE");
  const [logged, setLogged] = useState(false);
  const [faculty, setFaculty] = useState(false);

  console.log(role);

  const login = async (user: {}) => {
    //@ts-ignore
    //alert(user.email);
    await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.status === 200) {
        alert("done");
        setRole("STUDENT");
        setLogged(true);
      } else alert(res.status);
    });
  };

  const logOut = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        setRole("NONE");
        setLogged(false);
        setFaculty(false);
      } else alert("jo bre");
    });
  };

  return (
    <div className="App">
      {!logged && <LoginPage login={login} />}
      {logged && !faculty && <ChooseFaculty setFaculty={setFaculty} />}
      {logged && faculty && <Header role={role} />}
      {logged && faculty && (
        <main>
          <Routes>
            <Route path="profile/personal" element={<PersonalProfile />} />
            <Route path="semester" element={<Semester />} />
            <Route path="exams/studentexams" element={<RegisteredExams />} />
            <Route path="exams/registerexams" element={<RegisterExams />} />
            <Route path="exams/history" element={<ExamHistory />} />
            <Route path="settings" element={<Settings logOut={logOut} />} />
            <Route path="profile/student" element={<StudentProfile />} />
            <Route path="profile/transcript" element={<StudentTranscript />} />
            <Route path="posts" element={<Posts />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
