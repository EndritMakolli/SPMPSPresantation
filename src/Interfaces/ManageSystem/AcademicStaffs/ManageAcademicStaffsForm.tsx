import { SyntheticEvent } from "react";
import { AcademicStaff } from "../../../Types/AcademicStaff";

interface Props {
  academicStaff: AcademicStaff;
  onCancelClick: () => void;
  onFormInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onRegisterClick: () => void;
}

export const ManageAcademicStaffsForm = ({
  academicStaff,
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
        {academicStaff.userId ? "Ndrysho studentin" : "Regjistro student"}
      </h1>
      <div className="row mg-lg">
        <label htmlFor="">Emri i stafit akademik : </label>
        <input
          type="text"
          name="firstName"
          defaultValue={academicStaff.firstName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Mbiemri i stafit akademik  : </label>
        <input
          type="text"
          name="lastName"
          defaultValue={academicStaff.lastName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Emri dhe mbiemri i prindit : </label>
        <input
          type="text"
          name="parentName"
          defaultValue={academicStaff.parentName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Numri personal : </label>
        <input
          type="text"
          name="personalNumber"
          defaultValue={academicStaff.personalNumber}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Numri i telefonit : </label>
        <input
          type="text"
          name="telephone"
          defaultValue={academicStaff.telephone}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Ditëlindja : </label>
        <input
          type="date"
          name="birthday"
          defaultValue={academicStaff.email}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Ditëlindja : </label>
        <input
          type="date"
          name="birthday"
          defaultValue={academicStaff.email}
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
          defaultValue={academicStaff.email}
          onChange={onFormInputChange}
        />
      </div>
      <button onClick={onCancelClick}>ANULO</button>
      {!academicStaff.userId && <button onClick={onRegisterClick}>REGJISTRO</button>}
      {academicStaff.userId && <button onClick={onEditClick}>RUAJ NDRYSHIMET</button>}
    </form>
  );
};
