import { SyntheticEvent } from "react";
import { LectureHall } from "../../../Types/LectureHall";

interface Props {
  lectureHall: LectureHall;
  onCancelClick: () => void;
  onFormInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onRegisterClick: () => void;
}

export const ManageLectureHallsForm = ({
  lectureHall,
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
        {lectureHall.lectureHallId ? "Ndrysho lectureHallin" : "Regjistro lectureHall"}
      </h1>
      <div className="row mg-lg">
        <label htmlFor="">Emri i salles : </label>
        <input
          type="text"
          name="lectureHallName"
          defaultValue={lectureHall.lectureHallName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Kapaciteti i salles : </label>
        <input
          type="text"
          name="capacity"
          defaultValue={lectureHall.capacity}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Loakcioni i salles : </label>
        <input
          type="text"
          name="location"
          defaultValue={lectureHall.location}
          onChange={onFormInputChange}
        />
      </div>
      <button onClick={onCancelClick}>ANULO</button>
      {!lectureHall.lectureHallId && <button onClick={onRegisterClick}>REGJISTRO</button>}
      {lectureHall.lectureHallId && <button onClick={onEditClick}>RUAJ NDRYSHIMET</button>}
    </form>
  );
};


