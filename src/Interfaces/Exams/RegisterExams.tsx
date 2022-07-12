import { observer } from "mobx-react";
import React from "react";
import {  useEffect } from "react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";

export default observer(function RegisterExams() {
  const { studentManager, currentFaculty } = useStore().userStore;
  const { student, user, getCurrentSemester, getCurrentSpecialization } =
    studentManager!;
  const {
    registerableExams,
    getRegisterableExams,
    fetchRegisterableExams,
    registerExam,
    getSelectedLecturers,
    seasonLoaded,
    seasonOpen,
  } = useStore().examStore;

  const onLecturerSelectChange = (courseId: string, lecturerId: string) => {
    getSelectedLecturers()?.set(parseInt(courseId), lecturerId);
  };

  const onRegisterExamClick = async (courseId: string) => {
    await registerExam(user!.id, parseInt(courseId), currentFaculty!.facultyID);
  };

  useEffect(() => {
    const callFetchRegisterableExams = async () => {
      let id = parseInt(getCurrentSpecialization().toString());
      await fetchRegisterableExams(
        user!.id,
        getCurrentSemester().semesterID.toString(),
        id
      );
    };
    if (!student) return;

    if (!registerableExams) callFetchRegisterableExams();
  }, [fetchRegisterableExams, getCurrentSemester, getCurrentSpecialization, registerableExams, student, user]);

  return (
    <>
      <h1>Paraqit provime</h1>
      <section className="contents" id="registeredExams">
        {!seasonLoaded && <Loader />}
        {seasonLoaded && !seasonOpen() && (
          <article className="message text-center font-large">
            Aktualisht nuk ka afat të hapur për paraqitje të provimeve.
          </article>
        )}
        {seasonLoaded && seasonOpen() && (
          <table>
            <thead>
              <th>Lënda</th>
              <th>Profesori</th>
              <th>Kategoria</th>
              <th>Kreditë</th>
              <th>Semestri</th>
              <th></th>
            </thead>
            <tbody>
              {getRegisterableExams().map((crs) => {
                return (
                  <tr>
                    <td>{crs.courseName}</td>
                    <td>
                      <select
                        name=""
                        id=""
                        onChange={(e) =>
                          onLecturerSelectChange(
                            crs.courseId,
                            e.currentTarget.value
                          )
                        }
                      >
                        {crs.lecturers?.map((staff) => {
                          return (
                            <option value={staff.userId}>
                              {staff.fullName}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>{crs.courseCategory?.categoryName}</td>
                    <td>{crs.ects + " ECTS"}</td>
                    <td>{crs.semester?.semesterName}</td>
                    <td>
                      <button
                        style={{
                          minWidth: 100,
                          padding: 10,
                          textAlign: "center",
                        }}
                        onClick={() => onRegisterExamClick(crs.courseId)}
                      >
                        Paraqit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
});
