import { SyntheticEvent } from "react";
import { AdministriveStaff } from "../../../Types/AdministriveStaff";

interface Props {
  administriveStaff: AdministriveStaff;
  onCancelClick: () => void;
  onFormInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onRegisterClick: () => void;
}

export const ManageAdministriveStaffsForm = ({
  administriveStaff,
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
        {administriveStaff.userId ? "Ndrysho administriveStaffin" : "Regjistro administriveStaff"}
      </h1>
      <div className="row mg-lg">
        <label htmlFor="">Emri i stafit administrativ : </label>
        <input
          type="text"
          name="firstName"
          defaultValue={administriveStaff.firstName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Mbiemri i administriveStaffit : </label>
        <input
          type="text"
          name="lastName"
          defaultValue={administriveStaff.lastName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Emri dhe mbiemri i prindit : </label>
        <input
          type="text"
          name="parentName"
          defaultValue={administriveStaff.parentName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Numri personal : </label>
        <input
          type="text"
          name="personalNumber"
          defaultValue={administriveStaff.personalNumber}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Numri i telefonit : </label>
        <input
          type="text"
          name="telephone"
          defaultValue={administriveStaff.telephone}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Ditëlindja : </label>
        <input
          type="date"
          name="birthday"
          defaultValue={administriveStaff.email}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Ditëlindja : </label>
        <input
          type="date"
          name="birthday"
          defaultValue={administriveStaff.email}
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
          defaultValue={administriveStaff.email}
          onChange={onFormInputChange}
        />
      </div>
      <button onClick={onCancelClick}>ANULO</button>
      {!administriveStaff.userId && <button onClick={onRegisterClick}>REGJISTRO</button>}
      {administriveStaff.userId && <button onClick={onEditClick}>RUAJ NDRYSHIMET</button>}
    </form>
  );
};


