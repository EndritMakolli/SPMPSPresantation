import { DataField } from "../Components/Common/DataField";
import "../Style/AcademicStaffProfile.css";
import "../Style/PersonalProfile.css"; //for the personalProfileBlock class

export const AcademicStaffProfile = () => {
  return (
    <>
      <h1>Profili i Stafit Akademik</h1>
      <section className="contents" id="academicStaffProfile">
        <div className="personalProfileBlock">
          <img
            src="https://res.cloudinary.com/spms/image/upload/v1653323826/profile_pictures/testtina2.jpg"
            alt="Fotoja e juaj"
          />
        </div>
        <div className="personalProfileBlock">
          <DataField label="ID-ja e stafit akademik" contents="14537843" />
          <DataField label="Fakulteti" contents="Shkenca Kompjuterike dhe Inxhinieri"/>
          <DataField label="Niveli i ligjerimive" contents="Bachelors" />
          <DataField label="Numri i lendeve" contents="3" />
          <DataField label="Data e regjistrimit" contents="13 Gusht, 2019" />
          <DataField label="Niveli Akademik" contents="PHD"
          />
        </div>
      </section>
    </>
  );
};
