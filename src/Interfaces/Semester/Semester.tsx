import { Message } from "../../Components/Common/Message";
import { useStore } from "../../Stores/Store";
import "../../Style/Semester.css";
import { Semester } from "../../Types/Semester";

export const SemesterInformation = () => {
  const {
    getCurrentSemester,
    getRegisteredSemesters,
    faculty,
    registeredSemesters,
  } = useStore().userStore.studentManager!;

  const semesterInProgess = () => {
    return true;
  };

  const parseSemester = (semester: Semester) => {
    switch (semester.semesterID) {
      case 1:
        return "semestrin e parë";
      case 2:
        return "semestrin e dytë";
      default:
        return "sda";
    }
  };
  return (
    <>
      <h1>Semestri</h1>
      <section className="contents" id="semester">
        {semesterInProgess() && (
          <article className="full-height-column justify-between">
            <h2>Regjistro semestrin</h2>
            <form className="" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="select">Semestri i studimeve</label>
              <select name="" id="">
                {faculty?.semesters
                  ?.filter(
                    (s) =>
                      registeredSemesters!.find(
                        (ss) => ss.semesterID === s.semesterID
                      ) === undefined
                  )
                  .map((s) => {
                    return (
                      <option value={s.semesterID}>{s.semesterName}</option>
                    );
                  })}
              </select>
              <label htmlFor="">Termini i orarit</label>
              <select name="" id="">
                <option value="">Paradite</option>
                <option value="">Pasdite</option>
              </select>
              <button>REGJISTRO</button>
            </form>
            <Message
              contents="Të dhënat e regjistrimit u përditësuan me sukses!"
              type="info"
            />
          </article>
        )}
        <span className="dotted-line"></span>
        <article className="full-height-column">
          <h2>Informata rreth semestrit</h2>
          <Message
            contents={
              "Momentalisht jeni në " +
              parseSemester(getCurrentSemester()) +
              " të studimeve!"
            }
            type="info"
          />
          <Message
            contents="Ju keni regjistruar këtë semestër me datën 22 Maj, 2022"
            type="info"
          />
          <Message
            contents="Orari i regjistruar është i pasditës"
            type="info"
          />
        </article>
      </section>
    </>
  );
};
