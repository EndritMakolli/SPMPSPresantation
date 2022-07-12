import { observer } from "mobx-react-lite";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";

export default observer(function StudentSchedule() {
  const { schedule, lectureGroup } = useStore().userStore.studentManager!;

  return (
    <>
      <h1>Orari i grupit</h1>
      <section className="contents">
        {(!schedule || !lectureGroup) && <Loader />}
        {schedule && lectureGroup && (
          <>
            <span className="font-large">Grupi : {lectureGroup.groupName}</span>
            <table style={{ position: "relative", top: "-50px" }}>
              <thead>
                <tr>
                  <th>Lënda</th>
                  <th>Ligjëruesi</th>
                  <th>Lloji i ligjëratës</th>
                  <th>Koha e fillimit</th>
                  <th>Koha e mbarimit</th>
                  <th>Lokacioni</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((lecture) => {
                  return (
                    <tr key={lecture.lectureId}>
                      <td>{lecture.course.courseName}</td>
                      <td>{lecture.academicStaff.fullName}</td>
                      <td>Ligjëratë</td>
                      <td>{lecture.startTime.substring(11, 16)}</td>
                      <td>{lecture.endTime.substring(11, 16)}</td>
                      <td>{lecture.lectureHall.hallName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
});
