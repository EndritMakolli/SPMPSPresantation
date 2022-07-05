import { SyntheticEvent } from "react";

interface Props {
  onFilterInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onRegisterClick: () => void;
}

export const ManageCoursesHeader = ({
  onFilterInputChange,
  onRegisterClick,
}: Props) => {
  return (
    <div className="row">
      <div className="row col-4 align-center">
        <label className="font-md" htmlFor="">
          Kërko një lende :{" "}
        </label>
        <input
          className="col-6"
          type="text"
          placeholder="Kërko sipas një fushe..."
          onChange={onFilterInputChange}
        />
      </div>
      <div className="row col-4">
        <button onClick={onRegisterClick} className="col-6 off-6">
          Regjistro një lende
        </button>
      </div>
    </div>
  );
};


