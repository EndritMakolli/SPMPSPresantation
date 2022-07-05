import { AdministriveStaff } from "../../../Types/AdministriveStaff";

interface Props {
administriveStaffs: AdministriveStaff[];
  onDetailsClick: (userId: string) => void;
}

export const ManageAdministriveStaffsTable = ({ administriveStaffs, onDetailsClick }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>IDja administrative</th>
          <th>Emri dhe mbiemri</th>
          <th>Emri i prindit</th>
          <th>Operacionet</th>
        </tr>
      </thead>
      <tbody>
        {administriveStaffs.map((administriveStaff) => {
          return (
            <tr key={administriveStaff.userId}>
              <td>{administriveStaff.administriveStaffId}</td>
              <td>{administriveStaff.firstName + " " + administriveStaff.lastName}</td>
              <td>{administriveStaff.parentName}</td>
              <td>
                <button onClick={() => onDetailsClick(administriveStaff.userId)}>
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
