import React, { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Header } from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import { PersonalProfile } from "./Interfaces/PersonalProfile";

interface Product {
  productId: string;
  productName: string;
  productValue: number;
}

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
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
