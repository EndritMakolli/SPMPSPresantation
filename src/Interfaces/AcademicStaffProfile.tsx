import { observer } from "mobx-react";
import { DataField } from "../Components/Common/DataField";
import { Loader } from "../Components/Loader";
import { useStore } from "../Stores/Store";
import "../Style/AcademicStaffProfile.css";
import "../Style/PersonalProfile.css"; //for the personalProfileBlock class

export default observer(function AcademicStaffProfile() {
  const { academicStaff, getCourses, user, faculty, courses } =
    useStore().userStore.academicManager!;

  return (
    <>
      <h1>Profili i stafit akademik</h1>
      <section className="contents" id="academicStaffProfile">
        {!academicStaff && <Loader />}
        {academicStaff && (
          <>
            <div className="personalProfileBlock">
              <DataField
                label="Fakulteti momental"
                contents={faculty.major.majorName}
              />
              <DataField
                label="Data e regjistrimit"
                contents="13 Gusht, 2019"
              />
              <DataField
                label="Niveli Akademik"
                contents={academicStaff?.academicLevel?.name}
              />
            </div>
            <div className="personalProfileBlock">
              <img src={user.profilePictureURL} alt="Fotoja e juaj" />
            </div>
            <div className="personalProfileBlock">
              <label htmlFor="span">Lëndët që jepni</label>
              {courses &&
                getCourses().map((crs) => {
                  return (
                    <p
                      key={crs.courseId}
                      className="font-medium mg-lg underlined pad-lg"
                    >
                      {crs.courseName}
                    </p>
                  );
                })}
            </div>
          </>
        )}
      </section>
    </>
  );
});
