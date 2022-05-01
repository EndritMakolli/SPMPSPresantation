import "../Style/StudentProfile.css";

export const StudentProfile = () => {
  return (
    <div className="studentOuterDiv">
      <h1>Profili studentor</h1>
      <div className="studentMainContainer">
        <img
          id="studentProfileImage"
          src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
          alt=""
        />
        <div className="studentInputsContainer">
          <input
            type="text"
            className="studentProfileInputs"
            placeholder="ID e Studentit"
            readOnly
          ></input>
          <input
            type="text"
            className="studentProfileInputs"
            placeholder="Fakulteti"
            readOnly
          ></input>
          <div className="studentSpecialInputsContainer">
            <input
              type="text"
              className="studentSpecialInputs"
              placeholder="Niveli i Studimeve"
              readOnly
            ></input>
            <input
              type="text"
              id="studentSpecialInput2"
              className="studentSpecialInputs"
              placeholder="Gjenerata"
              readOnly
            ></input>
          </div>
          <input
            type="text"
            className="studentProfileInputs"
            placeholder="Data e Regjistrimit"
            readOnly
          ></input>
          <input
            type="text"
            className="studentProfileInputs"
            placeholder="Specializimi"
            readOnly
          ></input>
        </div>
      </div>
    </div>
  );
};
