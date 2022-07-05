import { Group } from "../../../Types/Group";

interface Props {
  group: Group;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReturnClick: () => void;
}

export const ManageGroupsDetails = ({
  group,
  onDeleteClick,
  onEditClick,
  onReturnClick,
}: Props) => {
  return (
    <article>
      <div className="column justify-center align-center col-6 off-3">
        <h2 className="mg-lg bold">Detajet e groupit</h2>
        <p className="font-large mg-lg underlined">
          {" Emri i Grupit:  " + group.groupName}
        </p>
        <p className="font-medium mg-lg underlined">{group.seasonId}</p>
        <p className="font-medium mg-lg underlined">{group.timeSlot}</p>
        <p className="font-medium mg-lg underlined">
          IDja groupore -
          <span className="bold">{" " + group.groupId}</span>
        </p>
        <p className="font-medium mg-lg underlined">
          Lendet:
          {group.classes.map((cl) => {
            return <p>{cl.course.courseName + " ne sallen " +  cl.lectureHall.lectureHallName + " ne kohen " + cl.startingTime+" - " +cl.endingTime }</p>;
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


