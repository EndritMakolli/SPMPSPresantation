import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";
import "../../Style/History.css";
import { ExamSeason } from "../../Types/ExamSeason";

export default observer(function ExamHistory() {
  const { user } = useStore().userStore;
  const { getExamHistory, examHistory, fetchExamHistory } =
    useStore().examStore;

  const [index, setIndex] = useState(0);

  const handleArrowClick = (direction: number) => {
    let length = getExamHistory().length;
    if (direction === 0) {
      setIndex((((index - 1) % length) + length) % length);
    } else setIndex((index + 1) % getExamHistory().length);
  };

  useEffect(() => {
    const callFetchHistory = async () => {
      await fetchExamHistory(user!.id);
    };

    if (!examHistory) callFetchHistory();
  }, [examHistory, fetchExamHistory, user]);
  return (
    <>
      <h1>Historiku i provimeve</h1>
      <section className="contents test123" id="examHistory">
        {!examHistory && <Loader />}
        {examHistory && <HistoryTable season={getExamHistory()[index]} />}

        {examHistory && (
          <div className="row justify-center">
            <button onClick={() => handleArrowClick(0)}>{"<<"}</button>
            <button onClick={() => handleArrowClick(1)}>{">>"}</button>
          </div>
        )}
      </section>
    </>
  );
});

interface History {
  season: ExamSeason;
}

const HistoryTable = ({ season }: History) => {
  return (
    <table>
      <div className="examSeason">
        <h2>{season.description}</h2>
        <table>
          <thead>
            <th>Lënda</th>
            <th>Profesori</th>
            <th>Nota</th>
            <th>Statusi</th>
          </thead>
          <tbody>
            {season.grades?.map((grade) => {
              return (
                <tr>
                  <td className="col-4">{grade.course?.courseName}</td>
                  <td className="col-3">{grade.professor?.fullName}</td>
                  <td className="col-3">{grade.value}</td>
                  <td className="col-3">{grade.status?.statusName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </table>
  );
};

// {
//   examHistory && (
//     <>
//       {getExamHistory().map((history) => {
//         return (
//           <div className="examSeason">
//             <h2>{history.description}</h2>
//             <table>
//               <thead>
//                 <th>Lënda</th>
//                 <th>Profesori</th>
//                 <th>Nota</th>
//                 <th>Statusi</th>
//               </thead>
//               <tbody>
//                 {history.grades?.map((grade) => {
//                   return (
//                     <tr>
//                       <td className="col-4">{grade.course?.courseName}</td>
//                       <td className="col-3">{grade.professor?.fullName}</td>
//                       <td className="col-3">{grade.value}</td>
//                       <td className="col-3">{grade.status?.statusName}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         );
//       })}
//     </>
//   );
// }
