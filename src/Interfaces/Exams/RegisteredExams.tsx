import { observer } from "mobx-react";
import { useEffect } from "react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";
import { Grade } from "../../Types/Grade";
import { dateParser, timeParser } from "../../utils";

export default observer(function RegisteredExams() {
  const { user, currentFaculty } = useStore().userStore;
  const {
    fetchRegisteredExams,
    getRegisteredExams,
    currentSeason,
    registeredExams,
    refuseGrade,
    cancelExamRegistration,
  } = useStore().examStore;

  const ms = 24 * 3600 * 1000;

  useEffect(() => {
    const loadRegisteredExams = async () => {
      await fetchRegisteredExams(user?.id!, currentFaculty?.facultyID!);
    };
    if (!registeredExams) loadRegisteredExams();
  }, [currentFaculty?.facultyID, fetchRegisteredExams, registeredExams, user?.id]);

  const canCancelRegistration = () => {
    return currentSeason?.status.statusId !== 1; // Status with ID 1 is OPEN
  };

  const cannotRefuseGrade = (grade: Grade) => {
    let datestring = grade.dateGraded;
    if (datestring.charAt(0) === "0") return true;
    if (grade.status!.statusId >= 2) return true;
    let dateGraded = new Date(datestring);
    let today = new Date();
    let diff = (dateGraded.getTime() - today.getTime()) / ms;
    return diff < -2;
  };

  const onRefuseGradeClick = async (gradeId: number) => {
    await refuseGrade(gradeId, user!.id);
  };

  const onCancelRegistrationClick = async (gradeId: number) => {
    await cancelExamRegistration(gradeId, user!.id);
  };

  return (
    <>
      <h1>Provimet e paraqitura</h1>
      <section className="contents" id="registeredExams">
        {!registeredExams && <Loader />}
        {registeredExams && (
          <table className="font-small">
            <thead>
              <th>Lënda</th>
              <th>Profesori</th>
              <th>Nota</th>
              <th>Data e vendosjes</th>
              <th>Statusi</th>
              <th></th>
            </thead>
            <tbody>
              {getRegisteredExams().map((exam) => {
                return (
                  <tr key={exam.gradeId}>
                    <td>{exam.course?.courseName}</td>
                    <td>{exam.professor?.fullName}</td>
                    <td>{exam.value === -1 ? "---" : exam.value}</td>
                    <td>
                      {exam.dateGraded.startsWith("0")
                        ? "---"
                        : dateParser(exam.dateGraded) +
                          ", " +
                          timeParser(exam.dateGraded)}
                    </td>
                    <td>{exam.status?.statusName}</td>
                    <td className="col-3">
                      <button
                        onClick={() => onCancelRegistrationClick(exam.gradeId)}
                        disabled={canCancelRegistration()}
                      >
                        Anulo paraqitjen
                      </button>
                      <button
                        onClick={() => onRefuseGradeClick(exam.gradeId)}
                        disabled={cannotRefuseGrade(exam)}
                      >
                        Refuzo notën
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
