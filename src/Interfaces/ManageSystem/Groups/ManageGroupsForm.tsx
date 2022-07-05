import { SyntheticEvent } from "react";
import { Group } from "../../../Types/Group";

interface Props {
  group: Group;
  onCancelClick: () => void;
  onFormInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onRegisterClick: () => void;
}

export const ManageGroupsForm = ({
  group,
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
        {group.groupId ? "Ndrysho groupin" : "Regjistro group"}
      </h1>
      <div className="row mg-lg">
        <label htmlFor="">Emri i grupit : </label>
        <input
          type="text"
          name="groupName"
          defaultValue={group.groupName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Slloti Kohor</label>
        <input
          type="text"
          name="timeSlot"
          defaultValue={group.timeSlot}
          onChange={onFormInputChange}
        />
      </div>
      <button onClick={onCancelClick}>ANULO</button>
      {!group.groupId && <button onClick={onRegisterClick}>REGJISTRO</button>}
      {group.groupId && <button onClick={onEditClick}>RUAJ NDRYSHIMET</button>}
    </form>
  );
};


