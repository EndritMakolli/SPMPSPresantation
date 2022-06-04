import { BusSchedule } from "../../Types/BusSchedule";
import { Location } from "../../Types/Location";

interface Props {
  schedule: BusSchedule;
  mode: "EDIT" | "CREATE";
  onSelectChange: (id: number, name: string) => void;
  locations: Location[];
  onInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onCreateClick: () => void;
  onCancelClick: (sch: BusSchedule) => void;
  onUpdateClick: () => void;
}

export const BusScheduleForm = ({
  schedule,
  mode,
  onSelectChange,
  locations,
  onInputChange,
  onCreateClick,
  onUpdateClick,
  onCancelClick,
}: Props) => {
  return (
    <div className="column col-6 off-3 align-center justify-between pad-sm">
      <div className="row">
        <span className="font-large">Zgjedh lokacionin :</span>
        <select
          onChange={(e) =>
            onSelectChange(
              parseInt(e.target.value),
              e.target.options[e.target.options.selectedIndex].id
            )
          }
          name="location-pick"
          className="col-3 border-dark-md"
          defaultValue={schedule.locationId}
          disabled={mode === "EDIT"}
        >
          {locations.map((opt) => {
            return (
              <option value={opt.locationId} id={opt.locationName}>
                {opt.locationName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        <span className="font-large">Ku do të niset autobusi? :</span>
        <input
          type="text"
          name="departingPlace"
          onChange={onInputChange}
          defaultValue={schedule.departingPlace}
        />
      </div>
      <div className="row">
        <span className="font-large">Google Maps URL i lokacionit :</span>
        <input
          type="text"
          name="departingPlaceURL"
          onChange={onInputChange}
          defaultValue={schedule.departingPlaceURL}
        />
      </div>
      <div className="row justify-center">
        {mode === "CREATE" ? (
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
    </div>
  );
};
