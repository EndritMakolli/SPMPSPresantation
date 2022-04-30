import { useState } from "react";
import "./App.css";
import "./Style/CommonStyles.css";
import { Header } from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import { PersonalProfile } from "./Interfaces/PersonalProfile";
import { Semester } from "./Interfaces/Semester/Semester";
import { RegisteredExams } from "./Interfaces/Exams/RegisteredExams";

function App() {
  const [role, setRole] = useState("NONE");
  const [logged, setLogged] = useState(false);
  return (
    <div className="App">
      {role === "NONE" && (
        <>
          <button
            onClick={() => {
              setLogged(true);
              setRole("STUDENT");
            }}
          >
            click me
          </button>
        </>
      )}
      {logged && <Header role={role} />}
      {logged && (
        <main>
          <Routes>
            <Route path="profile/personal" element={<PersonalProfile />} />
            <Route path="semester" element={<Semester />} />
            <Route path="exams/studentexams" element={<RegisteredExams />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
