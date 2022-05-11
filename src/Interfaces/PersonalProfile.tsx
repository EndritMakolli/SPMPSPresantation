import "../Style/PersonalProfile.css";
import { DataField } from "../Components/Common/DataField";

export const PersonalProfile = () => {
  return (
    <>
      <h1 id="title">Profili personal</h1>
      <section className="contents" id="personalProfile">
        <div className="personalProfileBlock">
          <DataField label="Emri dhe mbiemri" contents="Rilind Bicaj" />
          <DataField label="Emri i prindit" contents="Sadik Bicaj" />
          <DataField label="Ditëlindja" contents="22 Dhjetor, 2000" />
          <DataField label="Mosha" contents="21 vjeç" />
          <DataField label="Numri i letërnjoftimit" contents="123141512" />
          <DataField label="Email adresa" contents="rilindbicaj@gmail.com" />
          <DataField label="Gjinia" contents="Mashkull" />
        </div>

        <div className="personalProfileBlock">
          <img
            src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
            alt="Fotoja e juaj"
          />
        </div>

        <div className="personalProfileBlock">
          <DataField label="Numri i telefonit" contents="+383 45 994 307" />
          <DataField label="Shteti" contents="Kosovë" />
          <DataField label="Qyteti" contents="Istog" />
          <DataField
            label="Adresa"
            contents="Vrellë e Istogut, Rruga Tedeli, nr. 15"
          />
          <DataField label="ZIP Kodi" contents="30000" />
        </div>
      </section>
    </>
  );
};
