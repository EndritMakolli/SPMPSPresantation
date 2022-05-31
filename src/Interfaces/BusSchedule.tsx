import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { observer } from "mobx-react";
import { Loader } from "../Components/Loader";
import { useStore } from "../Stores/Store";

export default observer(function BusSchedule() {
  const { schedules, currentSchedule, selectSchedule } =
    useStore().busScheduleStore;

  return (
    <>
      <h1>Orari i autobusëve</h1>
      <section className="contents">
        {!schedules && <Loader />}
        {schedules && (
          <>
            <div className="row pad-sm">
              <div className="col4">
                <span className="font-large">Zgjedh lokacionin : </span>
                <select
                  onChange={(e) => selectSchedule(parseInt(e.target.value))}
                  name="location-pick"
                  className="col4 border-dark-md"
                  defaultValue={currentSchedule?.locationId}
                >
                  {schedules.map((opt) => {
                    return (
                      <option value={opt.locationId}>{opt.locationName}</option>
                    );
                  })}
                </select>
              </div>
              <div>
                <LocationOnOutlinedIcon fontSize="large" />
                <span className="font-large">
                  {currentSchedule?.departingPlace}
                </span>
              </div>
            </div>
            <table className="table-fixed">
              <thead>
                <th>Nisjet nga pika</th>
                <th>Nisjet nga objekti</th>
              </thead>
              <tbody>
                {currentSchedule?.slots.map((slot) => {
                  return (
                    <tr className="font-large">
                      <td>{slot.departTime}</td>
                      <td>{slot.arrivalTime}</td>
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
