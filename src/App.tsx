import { useState } from "react";
import "./App.css";
import "./Style/CommonStyles.css";
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
import { Transkripta } from "./Interfaces/Exams/Transkripta";
import { Njoftimet } from "./Interfaces/Njoftimet";

interface Product {
  productId: string;
  productName: string;
  productValue: number;
}

function App() {
  const [role, setRole] = useState("NONE");
  const [logged, setLogged] = useState(false);
  const [faculty, setFaculty] = useState(false);
  return (
    <div className="App">
      {role === "NONE" && (
        <button
          onClick={() => {
            setLogged(true);
            setRole("STUDENT");
          }}
        >
          LOGIN
        </button>
      )}
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
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile/student" element={<StudentProfile />} />
            <Route path="profile/transcript" element={<Transkripta />} />
            <Route path="posts" element={<Njoftimet />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
