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
  buttonsDisabled: boolean;
}

export const BusScheduleHeading = ({
  onCreateScheduleClick,
  onEditScheduleClick,
  onDeleteScheduleClick,
  adminMode,
  buttonsDisabled,
}: BusScheduleHeadingProps) => {
  const {
    currentSchedule,
    isInScheduleCreateMode,
    selectSchedule,
    getAssignedLocations,
  } = useStore().busScheduleStore;
  return (
    <>
      {!isInScheduleCreateMode() && (
        <div className="row justify-between wrap">
          <div className="col-4 aligned-text">
            <span className="font-large">Zgjedh lokacionin : </span>
            <select
              onChange={(e) => selectSchedule(e.target.value)}
              name="location-pick"
              className="col-5 border-dark-md"
              defaultValue={currentSchedule?.busScheduleID}
            >
              {getAssignedLocations().map((opt) => {
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
                <button
                  onClick={onCreateScheduleClick}
                  disabled={buttonsDisabled}
                >
                  <AddIcon fontSize="small" />
                  SHTO NJË ORAR
                </button>
                <button
                  className="col-9"
                  disabled={buttonsDisabled}
                  onClick={onEditScheduleClick}
                >
                  <EditIcon fontSize="small" />
                  MODIFIKO KËTË ORAR
                </button>
                <button
                  disabled={buttonsDisabled}
                  className="col-9"
                  onClick={onDeleteScheduleClick}
                >
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
