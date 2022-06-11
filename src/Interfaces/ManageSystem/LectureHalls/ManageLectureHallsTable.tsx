import { LectureHall } from "../../../Types/LectureHall";

interface Props {
  lectureHalls: LectureHall[];
  onDetailsClick: (userId: string) => void;
}

export const ManageLectureHallsTable = ({ lectureHalls, onDetailsClick }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>IDja e salles</th>
          <th>Emri i salles</th>
          <th>Kapaciteti</th>
          <th>Lokacioni</th>
          <th>Operacionet</th>
        </tr>
      </thead>
      <tbody>
        {lectureHalls.map((lectureHall) => {
          return (
            <tr key={lectureHall.lectureHallId}>
              <td>{lectureHall.lectureHallId}</td>
              <td>{lectureHall.lectureHallName}</td>
              <td>{lectureHall.capacity}</td>
              <td>{lectureHall.location}</td>
              <td>
                <button onClick={() => onDetailsClick(lectureHall.lectureHallId)}>
                  SHIKO DETAJET
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


