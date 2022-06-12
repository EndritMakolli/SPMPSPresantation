import { BusScheduleViewModes } from "../../Stores/BusScheduleStore";
import { BusSchedule } from "../../Types/BusSchedule";
import { Location } from "../../Types/Location";

interface Props {
  schedule: BusSchedule;
  location: Location;
  mode:
    | BusScheduleViewModes.EDIT_SCHEDULE
    | BusScheduleViewModes.CREATE_SCHEDULE;
  onSelectChange: (id: string, name: string) => void;
  unassignedLocations: Location[];
  assignedLocations: Location[];
  onInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onCreateClick: () => void;
  onCancelClick: (sch: BusSchedule) => void;
  onUpdateClick: () => void;
}

export const BusScheduleForm = ({
  schedule,
  mode,
  onSelectChange,
  unassignedLocations,
  assignedLocations,
  onInputChange,
  onCreateClick,
  onUpdateClick,
  onCancelClick,
}: Props) => {
  let locations =
    mode === BusScheduleViewModes.EDIT_SCHEDULE
      ? assignedLocations
      : unassignedLocations;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="col-6 off-3 column justify-around align-center margined-insides"
    >
      <div className="row justify-between">
        <span className="font-large">Zgjedh lokacionin :</span>
        <select
          onChange={(e) =>
            onSelectChange(
              e.target.value,
              e.target.options[e.target.options.selectedIndex].id
            )
          }
          name="location-pick"
          className="col-3 border-dark-md"
          defaultValue={schedule.busScheduleID}
          disabled={mode === BusScheduleViewModes.EDIT_SCHEDULE}
        >
          {locations.map((opt) => {
            return (
              <option
                key={opt.locationId}
                value={opt.locationId}
                id={opt.locationName}
              >
                {opt.locationName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row justify-between">
        <span className="font-medium">Ku do të niset autobusi? :</span>
        <input
          type="text"
          name="departingPlace"
          className="col-5"
          onChange={onInputChange}
          defaultValue={schedule.departingPlace}
        />
      </div>
      <div className="row">
        <span className="font-medium">Google Maps URL i lokacionit :</span>
        <input
          type="text"
          className="col-5"
          name="departingPlaceURL"
          onChange={onInputChange}
          defaultValue={schedule.departingPlaceURL}
        />
      </div>
      <div className="row justify-center">
        {mode === BusScheduleViewModes.CREATE_SCHEDULE ? (
          <button className="font-medium" onClick={onCreateClick}>
            SHTO ORARIN
          </button>
        ) : (
          <button className="font-medium" onClick={onUpdateClick}>
            RUAJ NDRYSHIMET
          </button>
        )}
        <button className="font-medium" onClick={() => onCancelClick(schedule)}>
          ANULO
        </button>
      </div>
    </form>
  );
};
