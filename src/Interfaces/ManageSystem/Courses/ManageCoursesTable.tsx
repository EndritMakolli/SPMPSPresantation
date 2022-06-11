import { Course } from "../../../Types/Course";

interface Props {
  courses: Course[];
  onDetailsClick: (courseId: string) => void;
}

export const ManageCoursesTable = ({ courses, onDetailsClick }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>IDja e lendes</th>
          <th>Emri i lendes</th>
          <th>Kredite</th>
          <th>Semestri</th>
          <th>Specialzimi</th>
          <th>Kategoria</th>
          <th>Operacionet</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => {
          return (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.ECTS}</td>
              <td>{course.semester.semesterName}</td>
              <td>{course.specializations.specializationName}</td>
              <td>{course.courseCategory}</td>
              <td>
                <button onClick={() => onDetailsClick(course.courseId)}>
                  SHIKO DETAJET
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


