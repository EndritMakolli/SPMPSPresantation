import { AcademicStaff } from "../../../Types/AcademicStaff";

interface Props {
  academicStaff: AcademicStaff;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReturnClick: () => void;
}

export const ManageAcademicStaffsDetails = ({
  academicStaff,
  onDeleteClick,
  onEditClick,
  onReturnClick,
}: Props) => {
  return (
    <article>
      <div className="column justify-center align-center col-6 off-3">
        <h2 className="mg-lg bold">Detajet e studentit</h2>
        <img
          className="col-6 mg-lg"
          src={academicStaff.profilePictureUrl}
          alt="Fotoja e profilit"
        />
        <p className="font-large mg-lg underlined">
          {academicStaff.firstName + " " + academicStaff.lastName}
        </p>
        <p className="font-medium mg-lg underlined">{academicStaff.gender}</p>
        <p className="font-medium mg-lg underlined">{academicStaff.email}</p>
        <p className="font-medium mg-lg underlined">{academicStaff.address}</p>
        <p className="font-medium mg-lg underlined">{academicStaff.telephone}</p>
        <p className="font-medium mg-lg underlined"></p>
        <p className="font-medium mg-lg underlined"></p>
        <p className="font-medium mg-lg underlined">
          IDja studentore -
          <span className="bold">{" " + academicStaff.academicStaffId}</span>
        </p>
        <p className="font-medium mg-lg underlined">
          {academicStaff.academicLevels.map((academicLevels) => {
            return <p>{academicLevels.academicLevelName}</p>;
          })}
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
