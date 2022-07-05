import { LectureHall } from "../../../Types/LectureHall";

interface Props {
  lectureHall: LectureHall;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReturnClick: () => void;
}

export const ManageLectureHallsDetails = ({
  lectureHall,
  onDeleteClick,
  onEditClick,
  onReturnClick,
}: Props) => {
  return (
    <article>
      <div className="column justify-center align-center col-6 off-3">
        <h2 className="mg-lg bold">Detajet e salles</h2>
        <p className="font-large mg-lg underlined">
          {" Emri i salles : " + lectureHall.lectureHallName}
        </p>
        <p className="font-medium mg-lg underlined">{lectureHall.capacity}</p>
        <p className="font-medium mg-lg underlined">{lectureHall.location}</p>
        <p className="font-medium mg-lg underlined">
          IDja e salles -
          <span className="bold">{" " + lectureHall.lectureHallId}</span>
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


