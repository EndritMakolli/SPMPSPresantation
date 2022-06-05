import { useStore } from "../../Stores/Store";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

interface BusScheduleHeadingProps {
  adminMode: boolean;
  onEditScheduleClick: () => void;
  onCreateScheduleClick: () => void;
  onDeleteScheduleClick: () => void;
}

export const BusScheduleHeading = ({
  onCreateScheduleClick,
  onEditScheduleClick,
  onDeleteScheduleClick,
  adminMode,
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
          <div className="col-4 aligned-text">
            <span className="font-large">Zgjedh lokacionin : </span>
            <select
              onChange={(e) => selectSchedule(parseInt(e.target.value))}
              name="location-pick"
              className="col-4 border-dark-md"
              defaultValue={currentSchedule?.locationId}
            >
              {getSchedules().map((opt) => {
                return (
                  <option key={opt.locationId} value={opt.locationId}>
                    {opt.locationName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col3 aligned-text">
            <a href={currentSchedule?.departingPlaceURL}>
              <LocationOnOutlinedIcon fontSize="large" />
            </a>

            <span className="font-large">
              {currentSchedule?.departingPlace}
            </span>
          </div>
          {adminMode && (
            <>
              <div className="row justify-center">
                <button onClick={onCreateScheduleClick}>
                  <AddIcon fontSize="small" />
                  SHTO NJË ORAR
                </button>
                <button className="col-9" onClick={onEditScheduleClick}>
                  <EditIcon fontSize="small" />
                  MODIFIKO KËTË ORAR
                </button>
                <button className="col-9" onClick={onDeleteScheduleClick}>
                  <CloseIcon fontSize="small" />
                  FSHIJ KËTË ORAR
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
