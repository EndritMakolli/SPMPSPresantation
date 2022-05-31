import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { observer } from "mobx-react";
import { Loader } from "../Components/Loader";
import { useStore } from "../Stores/Store";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default observer(function BusSchedule() {
  const {
    schedules,
    currentSchedule,
    selectSchedule,
    setEditMode,
    handleCloseButton,
    mode,
    saveChangesToSlot,
    updateSlot,
    currentSlot,
    setCreateMode,
  } = useStore().busScheduleStore;
  const { role } = useStore().userStore;

  const handleSlotInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    updateSlot({
      ...currentSlot!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

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
                      {mode === "EDIT" && currentSlot?.slotId === slot.slotId && (
                        <>
                          <td>
                            <input
                              type="time"
                              name="departTime"
                              defaultValue={slot.departTime}
                              onChange={handleSlotInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              name="arrivalTime"
                              onChange={handleSlotInputChange}
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
                      {role === "ADMIN" && (
                        <td>
                          {mode === "READ" && (
                            <span onClick={() => setEditMode(slot.slotId)}>
                              <EditIcon fontSize="large" />
                            </span>
                          )}
                          {(!currentSlot ||
                            currentSlot?.slotId === slot.slotId) && (
                            <span
                              onClick={() => handleCloseButton(slot.slotId)}
                            >
                              <CloseIcon fontSize="large" />
                            </span>
                          )}
                          {mode === "EDIT" &&
                            currentSlot?.slotId === slot.slotId && (
                              <span onClick={saveChangesToSlot}>
                                <SaveIcon fontSize="large" />
                              </span>
                            )}
                        </td>
                      )}
                    </tr>
                  );
                })}
                {mode === "CREATE" && role === "ADMIN" && (
                  <tr>
                    <td>
                      <input
                        type="time"
                        name="departTime"
                        onChange={handleSlotInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        name="arrivalTime"
                        onChange={handleSlotInputChange}
                      />
                    </td>
                    <td>
                      <span onClick={() => handleCloseButton()}>
                        <CloseIcon fontSize="large" />
                      </span>
                      {
                        <span onClick={saveChangesToSlot}>
                          <SaveIcon fontSize="large" />
                        </span>
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {mode === "READ" && role === "ADMIN" && (
              <p className="row justify-center align-center">
                <span onClick={setCreateMode} className="text-center">
                  <AddIcon fontSize="large" />
                </span>
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
});
