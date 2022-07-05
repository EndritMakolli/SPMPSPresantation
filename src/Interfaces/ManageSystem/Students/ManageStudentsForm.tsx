import { SyntheticEvent } from "react";
import { Student } from "../../../Types/Student";

interface Props {
  student: Student;
  onCancelClick: () => void;
  onFormInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onRegisterClick: () => void;
}

export const ManageStudentsForm = ({
  student,
  onCancelClick,
  onFormInputChange,
  onEditClick,
  onRegisterClick,
}: Props) => {
  return (
    <form
      className="col-6 off-3 column justify-center align-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-center underline-white">
        {student.studentId ? "Ndrysho studentin" : "Regjistro student"}
      </h1>
      <div className="row mg-lg">
        <label htmlFor="">Emri i studentit : </label>
        <input
          type="text"
          name="firstName"
          defaultValue={student.firstName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Mbiemri i studentit : </label>
        <input
          type="text"
          name="lastName"
          defaultValue={student.surname}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Emri dhe mbiemri i prindit : </label>
        <input
          type="text"
          name="parentName"
          defaultValue={student.parentName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Numri personal : </label>
        <input
          type="text"
          name="personalNumber"
          defaultValue={student.personalNumber}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Numri i telefonit : </label>
        <input
          type="text"
          name="telephone"
          defaultValue={student.phoneNumber}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Ditëlindja : </label>
        <input
          type="date"
          name="birthday"
          defaultValue={student.dateOfBirth}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg align-center">
        <label htmlFor="">Gjinia : </label>
        <input
          type="radio"
          name="gender"
          value={"Mashkull"}
          onChange={onFormInputChange}
        />
        <label htmlFor="gender">Mashkull</label>
        <input
          type="radio"
          name="gender"
          value={"Femër"}
          onChange={onFormInputChange}
        />
        <label htmlFor="gender">Femër</label>
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Adresa : </label>
        <input
          type="date"
          name="birthday"
          defaultValue={student.email}
          onChange={onFormInputChange}
        />
      </div>
      <button onClick={onCancelClick}>ANULO</button>
      {!student.id && <button onClick={onRegisterClick}>REGJISTRO</button>}
      {student.id && <button onClick={onEditClick}>RUAJ NDRYSHIMET</button>}
    </form>
  );
};
