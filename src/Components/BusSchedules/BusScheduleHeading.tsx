import { useStore } from "../../Stores/Store";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface BusScheduleHeadingProps {
  onEditScheduleClick: () => void;
  onCreateScheduleClick: () => void;
}

export const BusScheduleHeading = ({
  onCreateScheduleClick,
  onEditScheduleClick,
}: BusScheduleHeadingProps) => {
  const {
    currentSchedule,
    isInScheduleCreateMode,
    selectSchedule,
    getSchedules,
  } = useStore().busScheduleStore;
  return (
    <>
      {!isInScheduleCreateMode() && (
        <div className="row justify-between">
          <div className="col-4">
            <span className="font-large">Zgjedh lokacionin : </span>
            <select
              onChange={(e) => selectSchedule(parseInt(e.target.value))}
              name="location-pick"
              className="col-4 border-dark-md"
              defaultValue={currentSchedule?.locationId}
            >
              {getSchedules().map((opt) => {
                return (
                  <option value={opt.locationId}>{opt.locationName}</option>
                );
              })}
            </select>
          </div>
          <div className="col3">
            <a href={currentSchedule?.departingPlaceURL}>
              <LocationOnOutlinedIcon fontSize="large" />
            </a>

            <span className="font-large">
              {currentSchedule?.departingPlace}
            </span>
          </div>
          <div className="col-4">
            <button onClick={onCreateScheduleClick}>
              <LocationOnOutlinedIcon fontSize="small" />
              SHTO NJË ORAR
            </button>
            <button onClick={onEditScheduleClick}>MODIFIKO KËTË ORAR</button>
          </div>
        </div>
      )}
    </>
  );
};
