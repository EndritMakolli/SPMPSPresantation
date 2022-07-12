import { observer } from "mobx-react";
import { useEffect } from "react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";
import { Grade } from "../../Types/Grade";

export default observer(function StudentTranscript() {
  const { getTranscript, fetchTranscript, transcript } = useStore().examStore;
  const { user, currentFaculty } = useStore().userStore;

  useEffect(() => {
    const callFetchGrades = async () => {
      await fetchTranscript(user?.id!, currentFaculty?.facultyID!);
    };

    if (!transcript) callFetchGrades();
  }, [currentFaculty?.facultyID, fetchTranscript, transcript, user?.id]);

  return (
    <>
      <h1>Transkripta e notave</h1>
      <section className="contents" id="studentTranscript">
        {!transcript && <Loader />}
        {transcript && <TranscriptTable grades={getTranscript()} />}
      </section>
    </>
  );
});

interface TranscriptTableProps {
  grades: Grade[];
}

const TranscriptTable = ({ grades }: TranscriptTableProps) => {
  let count = 1;
  const getCreditCount = (): number => {
    let count = 0;
    grades.forEach((g) => (count += parseInt(g.course?.ects!)));
    return count;
  };

  const getAverageGrade = (): number => {
    let average = 0;
    grades.forEach((g) => {
      average += g.value;
    });
    average /= grades.length;
    return average;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Lënda</th>
            <th>ECTS</th>
            <th>Semestri</th>
            <th>Kategoria</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => {
            return (
              <tr key={grade.gradeId}>
                <td>{count++}</td>
                <td>{grade.course?.courseName}</td>
                <td>{grade.course?.ects}</td>
                <td>{grade.course?.semester?.semesterName}</td>
                <td>{grade.course?.courseCategory?.categoryName}</td>
                <td>{grade.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="row pad-lg">
        <span className="font-large">Kreditë totale - {getCreditCount()}</span>
        <span className="font-large">Nota mesatare - {getAverageGrade()}</span>
      </div>
    </>
  );
};
