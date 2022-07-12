import { DataField } from "../Components/Common/DataField";
import "../Style/StudentProfile.css";
import "../Style/PersonalProfile.css"; //for the personalProfileBlock class
import { useStore } from "../Stores/Store";
import { dateParser } from "../utils";
import { observer } from "mobx-react-lite";

export default observer(function StudentProfile() {
  const { user, student, faculty, specialization } =
    useStore().userStore.studentManager!;

  return (
    <>
      <h1>Profili studentor</h1>
      <section className="contents" id="studentProfile">
        <div className="personalProfileBlock">
          <img src={user?.profilePictureURL} alt="Fotoja e juaj" />
        </div>
        <div className="personalProfileBlock">
          <DataField label="ID-ja studentore" contents={student?.fileNumber!} />
          <DataField label="Fakulteti" contents={faculty?.major.majorName} />
          <DataField
            label="Niveli i studimeve"
            contents={faculty?.level.levelName}
          />
          <DataField label="Gjenerata" contents={student?.generation.name} />
          <DataField
            label="Data e regjistrimit"
            contents={dateParser(user?.dateRegistered!)}
          />
          <DataField
            label="Specializimi"
            contents={specialization?.specializationName}
          />
        </div>
      </section>
    </>
  );
});
