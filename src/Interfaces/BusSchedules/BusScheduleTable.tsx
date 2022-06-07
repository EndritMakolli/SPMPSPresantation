import { BusScheduleSlot } from "../../Types/BusSchedule";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { BusScheduleViewModes } from "../../Stores/BusScheduleStore";

interface Props {
  slots: BusScheduleSlot[];
  currentSlot: BusScheduleSlot | undefined;
  mode: BusScheduleViewModes;
  adminMode: boolean;
  onSlotEditClick: (slotId: number) => void;
  onSlotCreateClick: () => void;
  onSlotEditCancel: (slotId?: number) => void;
  onSlotEditSave: () => void;
  onSlotInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

export const BusScheduleTable = ({
  slots,
  mode,
  onSlotCreateClick,
  onSlotEditCancel,
  onSlotEditSave,
  currentSlot,
  onSlotInputChange,
  adminMode,
  onSlotEditClick,
}: Props) => {
  return (
    <>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="text-center">Nisjet nga pika</th>
            <th className="text-center">Nisjet nga objekti</th>
            {adminMode && <th className="text-center">Operacionet</th>}
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => {
            return (
              <tr key={slot.slotId} className="font-large">
                {mode === BusScheduleViewModes.EDIT_SLOT &&
                  currentSlot?.slotId === slot.slotId && (
                    <>
                      <td>
                        <input
                          type="time"
                          name="departTime"
                          defaultValue={slot.departTime}
                          onChange={onSlotInputChange}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          name="arrivalTime"
                          onChange={onSlotInputChange}
                          defaultValue={slot.arrivalTime}
                        />
                      </td>
                    </>
                  )}
                {currentSlot?.slotId !== slot.slotId && (
                  <>
                    <td>{slot.departTime}</td>
                    <td>{slot.arrivalTime}</td>
                  </>
                )}
                {adminMode && (
                  <td className="row justify-center">
                    {mode === BusScheduleViewModes.READ && (
                      <span onClick={() => onSlotEditClick(slot.slotId)}>
                        <EditIcon fontSize="large" />
                      </span>
                    )}
                    {(!currentSlot || currentSlot?.slotId === slot.slotId) && (
                      <span onClick={() => onSlotEditCancel(slot.slotId)}>
                        <CloseIcon fontSize="large" />
                      </span>
                    )}
                    {mode === BusScheduleViewModes.EDIT_SLOT &&
                      currentSlot?.slotId === slot.slotId && (
                        <span onClick={onSlotEditSave}>
                          <SaveIcon fontSize="large" />
                        </span>
                      )}
                  </td>
                )}
              </tr>
            );
          })}
          {mode === BusScheduleViewModes.CREATE_SLOT && adminMode && (
            <tr>
              <td>
                <input
                  type="time"
                  name="departTime"
                  onChange={onSlotInputChange}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="arrivalTime"
                  onChange={onSlotInputChange}
                />
              </td>
              <td>
                <span onClick={() => onSlotEditCancel()}>
                  <CloseIcon fontSize="large" />
                </span>

                <span onClick={onSlotEditSave}>
                  <SaveIcon fontSize="large" />
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {mode === BusScheduleViewModes.READ && adminMode && (
        <p className="row justify-center align-center">
          <span onClick={onSlotCreateClick} className="text-center mg-lg">
            <AddIcon fontSize="large" />
          </span>
        </p>
      )}
    </>
  );
};
