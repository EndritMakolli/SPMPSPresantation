import { Student } from "../../../Types/Student";

interface Props {
  student: Student;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReturnClick: () => void;
}

export const ManageStudentsDetails = ({
  student,
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
          src={student.profilePictureURL}
          alt="Fotoja e profilit"
        />
        <p className="font-large mg-lg underlined">
          {student.firstName + " " + student.surname}
        </p>
        <p className="font-medium mg-lg underlined">{student.gender}</p>
        <p className="font-medium mg-lg underlined">{student.email}</p>
        <p className="font-medium mg-lg underlined">{student.addressDetails}</p>
        <p className="font-medium mg-lg underlined">{student.phoneNumber}</p>
        <p className="font-medium mg-lg underlined"></p>
        <p className="font-medium mg-lg underlined">
          Gjenerata -
          <span className="bold">{" " + student.generation.name}</span>
        </p>
        <p className="font-medium mg-lg underlined">
          IDja studentore -
          <span className="bold">{" " + student.studentId}</span>
        </p>
        <p className="font-medium mg-lg underlined">
          {student.groups.map((group) => {
            return <p>{group.groupName}</p>;
          })}
        </p>
        <p className="font-medium mg-lg underlined">
          {student.specializations.map((spec) => {
            return <p className="text-center">{spec.specializationName}</p>;
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
