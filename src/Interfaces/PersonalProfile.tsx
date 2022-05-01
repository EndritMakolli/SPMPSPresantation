import "../Style/PersonalProfile.css";

export const PersonalProfile = () => {
  return (
    <div className="outerDiv">
      <h1 id="title">Profili personal</h1>
      <div className="theMainContainer">
        <div className="personalProfileContents">
          <div className="leftContainer">
            <input
              type="text"
              className="profileInputs"
              placeholder="Emri dhe Mbiemri"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="Emri i Prindit"
              readOnly
            ></input>
            <div>
              <input
                type="text"
                className="specialInputs"
                placeholder="Ditlindja"
                readOnly
              ></input>
              <input
                type="text"
                id="specialinput2"
                className="specialInputs"
                placeholder="Mosha"
                readOnly
              ></input>
            </div>
            <input
              type="text"
              className="profileInputs"
              placeholder="Numri i Leternjoftimit"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="Email Adresa"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="Gjinia"
              readOnly
            ></input>
          </div>

          <div className="ProfileImageContainer">
            <img
              id="ProfileImage"
              src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
            />
          </div>

          <div className="rightContainer">
            <input
              type="text"
              className="profileInputs"
              placeholder="Numri i Telefonit"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="Shteti"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="Qyteti"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="Adresa"
              readOnly
            ></input>
            <input
              type="text"
              className="profileInputs"
              placeholder="ZIP Kodi"
              readOnly
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};
