import { AcademicStaff } from "../../../Types/AcademicStaff";

interface Props {
  academicStaffs: AcademicStaff[];
  onDetailsClick: (userId: string) => void;
}

export const ManageAcademicStaffsTable = ({ academicStaffs, onDetailsClick }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>IDja akademike</th>
          <th>Emri dhe mbiemri</th>
          <th>Emri i prindit</th>
          <th>Operancionet</th>
        </tr>
      </thead>
      <tbody>
        {academicStaffs.map((academicStaff) => {
          return (
            <tr key={academicStaff.userId}>
              <td>{academicStaff.academicStaffId}</td>
              <td>{academicStaff.firstName + " " + academicStaff.lastName}</td>
              <td>{academicStaff.parentName}</td>
              <td>
                <button onClick={() => onDetailsClick(academicStaff.userId)}>
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
