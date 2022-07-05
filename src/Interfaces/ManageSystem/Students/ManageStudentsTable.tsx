import { Student } from "../../../Types/Student";

interface Props {
  students: Student[];
  onDetailsClick: (userId: string) => void;
}

export const ManageStudentsTable = ({ students, onDetailsClick }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>IDja studentore</th>
          <th>Emri dhe mbiemri</th>
          <th>Emri i prindit</th>
          <th>Gjenerata</th>
          <th>Operacionet</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {
          return (
            <tr key={student.id}>
              <td>{student.studentId}</td>
              <td>{student.firstName + " " + student.surname}</td>
              <td>{student.parentName}</td>
              <td>{student.generation.generationName}</td>
              <td>
                <button onClick={() => onDetailsClick(student.id)}>
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
