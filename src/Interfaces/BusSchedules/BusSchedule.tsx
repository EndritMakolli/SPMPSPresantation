import { observer } from "mobx-react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";

import React from "react";
import { BusScheduleHeading } from "./BusScheduleHeading";
import { BusScheduleForm } from "./BusScheduleForm";
import { BusSchedule } from "../../Types/BusSchedule";
import { BusScheduleTable } from "./BusScheduleTable";

export default observer(function BusSchedule() {
  const {
    currentSchedule,
    mode,
    deleteSchedule,
    updateSlot,
    currentSlot,
    setScheduleCreateMode,
    setSlotCreateMode,
    isLoading,
    saveChangesToSlot,
    setSlotEditMode,
    setReadMode,
    deleteSlot,
    getUnassignedLocations,
    updateSchedule,
    setScheduleEditingMode,
    hasSchedules,
    createSchedule,
    getLocationsFromSchedules,
  } = useStore().busScheduleStore;

  const { role } = useStore().userStore;

  const slotInputChangeHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    updateSlot({
      ...currentSlot!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleScheduleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    updateSchedule({
      ...currentSchedule!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleCreateSchedule = () => {
    if (getUnassignedLocations().length === 0) alert("Ska mo lokacione");
    else setScheduleCreateMode();
  };

  /**
   * Handles clicking the edit button on a slot.
   */

  const editSlotHandler = (slotId: number) => {
    setSlotEditMode(slotId);
  };

  /**
   * Handles clikcing the save icon after editing a slot.
   */

  const saveEditedSlotHandler = () => {
    saveChangesToSlot();
  };

  /**
   * Handles clicking the Edit Schedule button.
   */

  const editScheduleHandler = () => {
    setScheduleEditingMode();
  };

  /**
   * Handles clicking the ( + ) button for creating a new slot in a schedule.
   */

  const handleSlotCreate = () => {
    setSlotCreateMode();
  };

  /**
   * Handles clicking the create schedule button in the form.
   * @param id - the ID of the picked location for the schedule
   * @param name  - the name of the picked location for the schedule
   */

  const handleCreateScheduleOptionChange = (id: number, name: string) => {
    updateSchedule({ ...currentSchedule!, locationId: id, locationName: name });
  };

  /**
   * Cancels all changes to the current bus schedule being edited.
   * Must be passed the unchanged schedule object, to replace the mutated one.
   * @param sch the old BusSchedule object before being modified
   */

  const handleCancelScheduleEditing = (sch: BusSchedule) => {
    updateSchedule(sch);
    setReadMode();
  };

  /**
   * Handles clicking the X icon for a slot. If the slot is currently being edited,
   * it will fall back to read mode. Else, it will delete the slot whose ID is provided
   * as a parameter. The parameter is optional, so it can be used for simply cancelling
   * an editing session.
   * @param slotId - optional, the ID of the slot to be deleted.
   */

  const deleteSlotClickHandler = (slotId?: number) => {
    if (mode === "EDIT") {
      alert("Clicked after editing");
      setReadMode();
    } else if (slotId) deleteSlot(slotId);
  };

  /**
   * Handles clicking the confirmation button after editing a schedule.
   */

  const editSaveChangesHandler = () => {
    //Because of onChange, nothing else must be done; must add Axios call after backend connection
    setReadMode();
  };

  /**
   * Handles clicking the Delete Schedule button.
   */

  const deleteScheduleHandler = () => {
    deleteSchedule();
  };

  /**
   * Checks whether the create or editing schedule form is rendered.
   * @returns true if a single schedule is being created or edited, false othewise
   */

  const formIsOpen = () => {
    return (mode === "EDIT" || mode === "CREATE") && currentSlot === undefined;
  };

  return (
    <>
      <h1>Orari i autobusëve</h1>
      <section className="contents">
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {!formIsOpen() && hasSchedules() && (
              <BusScheduleHeading
                adminMode={role === "ADMIN"}
                onDeleteScheduleClick={deleteScheduleHandler}
                onEditScheduleClick={editScheduleHandler}
                onCreateScheduleClick={handleCreateSchedule}
              />
            )}
            {formIsOpen() && (
              <BusScheduleForm
                schedule={currentSchedule!}
                mode={mode === "CREATE" ? mode : "EDIT"}
                onSelectChange={handleCreateScheduleOptionChange}
                onCancelClick={handleCancelScheduleEditing}
                onCreateClick={createSchedule}
                onUpdateClick={editSaveChangesHandler}
                unassignedLocations={getUnassignedLocations()}
                assignedLocations={getLocationsFromSchedules()}
                onInputChange={handleScheduleInputChange}
              />
            )}
            {!formIsOpen() && hasSchedules() && (
              <BusScheduleTable
                adminMode={role === "ADMIN"}
                mode={mode!}
                slots={currentSchedule?.slots!}
                currentSlot={currentSlot}
                onSlotCreateClick={handleSlotCreate}
                onSlotEditCancel={deleteSlotClickHandler}
                onSlotEditClick={editSlotHandler}
                onSlotEditSave={saveEditedSlotHandler}
                onSlotInputChange={slotInputChangeHandler}
              />
            )}
          </>
        )}
        {!isLoading && !hasSchedules() && !formIsOpen() && (
          <div className="column col-6 off-3">
            <p className="font-large text-center">
              Nuk ka orare të regjistruara në sistem.
            </p>
            {role === "ADMIN" && (
              <button
                className="align-center col-3 off-4"
                onClick={handleCreateSchedule}
              >
                SHTO NJË ORAR
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
});
