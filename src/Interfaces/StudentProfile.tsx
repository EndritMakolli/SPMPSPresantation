import { DataField } from "../Components/Common/DataField";
import "../Style/StudentProfile.css";
import "../Style/PersonalProfile.css"; //for the personalProfileBlock class

export const StudentProfile = () => {
  return (
    <>
      <h1>Profili studentor</h1>
      <section className="contents" id="studentProfile">
        <div className="personalProfileBlock">
          <img
            src="https://res.cloudinary.com/spms/image/upload/v1653323826/profile_pictures/testtina2.jpg"
            alt="Fotoja e juaj"
          />
        </div>
        <div className="personalProfileBlock">
          <DataField label="ID-ja studentore" contents="192047139" />
          <DataField
            label="Fakulteti"
            contents="Shkenca Kompjuterike dhe Inxhinieri"
          />
          <DataField label="Niveli i studimeve" contents="Bachelors" />
          <DataField label="Gjenerata" contents="2019/2020" />
          <DataField label="Data e regjistrimit" contents="13 Gusht, 2019" />
          <DataField
            label="Specializimi"
            contents="Inxhinieri e Sistemeve Softuerike"
          />
        </div>
      </section>
    </>
  );
};
