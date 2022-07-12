import { observer } from "mobx-react";
import { SyntheticEvent, useEffect, useState } from "react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";
import { Student } from "../../Types/Student";

export default observer(function GradeExams() {
  const { getExams, getCourses, courses, exams, gradeStudent } =
    useStore().userStore.academicManager!;

  const [selectedCourseId, setSelectedCourseId] = useState(0);

  const getExamsByCourse = (courseId: number) => {
    return getExams().filter((e) => parseInt(e.course?.courseId!) === courseId);
  };

  const onCourseChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    setSelectedCourseId(parseInt(e.currentTarget.value));
  };

  const firstName = (student: Student) => {
    return student.fullName?.split(" ")[0];
  };

  const lastName = (student: Student) => {
    return student.fullName?.split(" ")[1];
  };

  const onGradeSaveClick = async (gradeId: number) => {
    let value = (
      document.getElementById("grade-" + gradeId) as HTMLSelectElement
    ).value;
    await gradeStudent(gradeId, parseInt(value));
  };

  useEffect(() => {
    if (courses === undefined || exams === undefined) return;
    else setSelectedCourseId(parseInt(getExams()[0].course?.courseId!));
  }, [courses, exams, getExams]);

  return (
    <>
      <h1>Noto provime</h1>
      <section className="contents" style={{ justifyContent: "flex-start" }}>
        {!courses && <Loader />}
        {courses && exams && (
          <>
            <div className="row align-center">
              <span className="font-large">Zgjedh lëndën : </span>
              <select
                defaultValue={selectedCourseId}
                onChange={onCourseChange}
                className="col-3"
                name=""
                id=""
              >
                {getCourses().map((course) => {
                  return (
                    <option key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </option>
                  );
                })}
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID e studentit</th>
                  <th>Emri</th>
                  <th>Mbiemri</th>
                  <th>Nota</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getExamsByCourse(selectedCourseId).map((grade) => {
                  return (
                    <tr key={grade.gradeId}>
                      <td>{grade.student?.fileNumber}</td>
                      <td>{firstName(grade.student!)}</td>
                      <td>{lastName(grade.student!)}</td>
                      <td className="col-2">
                        <select
                          defaultValue={grade.value}
                          id={"grade-" + grade.gradeId}
                        >
                          <option value="-1">Pa vendosur</option>
                          <option value="0">Abstenim</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </td>
                      <td className="col-3 align-center">
                        <button onClick={() => onGradeSaveClick(grade.gradeId)}>
                          Ruaj
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
});
