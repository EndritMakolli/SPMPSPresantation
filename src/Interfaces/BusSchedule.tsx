import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export const BusSchedule = () => {
  return (
    <>
      <h1>Orari i autobusëve</h1>
      <section className="contents">
        <div className="row pad-sm">
          <div className="col4">
            <span className="font-large">Zgjedh lokacionin : </span>
            <select name="location-pick" className="col4 border-dark-md">
              <option value="">Prishtinë</option>
              <option value="">Gjilan</option>
            </select>
          </div>
          <div>
            <LocationOnOutlinedIcon fontSize="large" />
            <span className="font-large">Pika e nisjes : Rrethi me Flamur</span>
          </div>
        </div>
        <table className="table-fixed">
          <thead>
            <th>Nisjet nga pika</th>
            <th>Nisjet nga objekti</th>
          </thead>
          <tbody>
            <tr className="font-large">
              <td>07:45</td>
              <td>08:20</td>
            </tr>
            <tr className="font-large">
              <td>07:45</td>
              <td>08:20</td>
            </tr>
            <tr className="font-large">
              <td>07:45</td>
              <td>08:20</td>
            </tr>
            <tr className="font-large">
              <td>07:45</td>
              <td>08:20</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};
