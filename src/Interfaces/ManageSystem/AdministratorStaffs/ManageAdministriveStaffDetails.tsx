import { AdministriveStaff } from "../../../Types/AdministriveStaff";

interface Props {
  administriveStaff: AdministriveStaff;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReturnClick: () => void;
}

export const ManageAdministriveStaffsDetails = ({
  administriveStaff,
  onDeleteClick,
  onEditClick,
  onReturnClick,
}: Props) => {
  return (
    <article>
      <div className="column justify-center align-center col-6 off-3">
        <h2 className="mg-lg bold">Detajet Administrive</h2>
        <img
          className="col-6 mg-lg"
          src={administriveStaff.profilePictureUrl}
          alt="Fotoja e profilit"
        />
        <p className="font-large mg-lg underlined">
          {administriveStaff.firstName + " " + administriveStaff.lastName}
        </p>
        <p className="font-medium mg-lg underlined">{administriveStaff.gender}</p>
        <p className="font-medium mg-lg underlined">{administriveStaff.email}</p>
        <p className="font-medium mg-lg underlined">{administriveStaff.address}</p>
        <p className="font-medium mg-lg underlined">{administriveStaff.telephone}</p>
        <p className="font-medium mg-lg underlined"></p>
        <p className="font-medium mg-lg underlined"></p>
        <p className="font-medium mg-lg underlined">
          IDja administrive -
          <span className="bold">{" " + administriveStaff.administriveStaffId}</span>
        </p>
        <div className="row justify-center mg-lg">
          <button onClick={onDeleteClick}>FSHIJ</button>
          <button onClick={onEditClick}>EDITO</button>
          <button onClick={onReturnClick}>KTHEHU</button>
        </div>
      </div>
    </article>
  );
};


