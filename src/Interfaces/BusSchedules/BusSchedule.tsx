import { observer } from "mobx-react";
import { Loader } from "../../Components/Loader";
import { useStore } from "../../Stores/Store";

import React from "react";
import { BusScheduleHeading } from "./BusScheduleHeading";
import { BusScheduleForm } from "./BusScheduleForm";
import { BusSchedule } from "../../Types/BusSchedule";
import { BusScheduleTable } from "./BusScheduleTable";
import { BusScheduleViewModes } from "../../Stores/BusScheduleStore";

export default observer(function BusSchedule() {
  const {
    currentSchedule,
    mode,
    deleteSchedule,
    isInSlotEditingMode,
    currentSlot,
    previousSchedule,
    setCurrentSlot,
    selectSlot,
    setCurrentSchedule,
    setMode,
    isLoading,
    setPreviousSchedule,
    setCurrentLocation,
    setDefaultSchedule,
    deselectSlot,
    setDefaultSlot,
    createSlot,
    editSlot,
    deleteSlot,
    getUnassignedLocations,
    updateSchedule,
    hasSchedules,
    createSchedule,
    getAssignedLocations,
    updateScheduleInformation,
    currentLocation,
    isInSlotCreateMode,
  } = useStore().busScheduleStore;

  const { role } = useStore().userStore;

  const slotInputChangeHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setCurrentSlot({
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
    else {
      setMode(BusScheduleViewModes.CREATE_SCHEDULE);
      setCurrentLocation(getUnassignedLocations()[0]);
      setPreviousSchedule(currentSchedule);
      setDefaultSchedule(getUnassignedLocations()[0].locationId);
    }
  };

  /**
   * Handles clicking the edit button on a slot.
   */

  const editSlotHandler = (slotId: string) => {
    setMode(BusScheduleViewModes.EDIT_SLOT);
    selectSlot(slotId);
  };

  /**
   * Handles clicking the save icon after editing a slot.
   */

  const saveEditedSlotHandler = () => {
    editSlot();
  };

  const createSlotHandler = () => {
    createSlot();
  };

  /**
   * Handles clicking the Edit Schedule button.
   */

  const editScheduleHandler = () => {
    setPreviousSchedule(currentSchedule);
    setMode(BusScheduleViewModes.EDIT_SCHEDULE);
  };

  /**
   * Handles clicking the ( + ) button for creating a new slot in a schedule.
   */

  const handleSlotCreate = () => {
    setMode(BusScheduleViewModes.CREATE_SLOT);
    setDefaultSlot();
  };

  /**
   * Handles clicking the create schedule button in the form.
   * @param id - the ID of the picked location for the schedule
   * @param name  - the name of the picked location for the schedule
   */

  const handleCreateScheduleOptionChange = (id: string, name: string) => {
    updateSchedule({ ...currentSchedule!, busScheduleID: id });
  };

  /**
   * Cancels all changes to the current bus schedule being edited.
   * Sets the previous schedule as the current one again.
   */

  const handleCancelScheduleEditing = () => {
    setCurrentSchedule(previousSchedule!);
    setMode(BusScheduleViewModes.READ);
  };

  /**
   * Handles clicking the X icon for a slot. If the slot is currently being edited,
   * it will fall back to read mode. Else, it will delete the slot whose ID is provided
   * as a parameter. The parameter is optional, so it can be used for simply cancelling
   * an editing session.
   * @param slotId - optional, the ID of the slot to be deleted.
   */

  const deleteSlotClickHandler = (slotId?: string) => {
    if (isInSlotCreateMode() || isInSlotEditingMode()) {
      setMode(BusScheduleViewModes.READ);
      deselectSlot();
    } else if (slotId) deleteSlot(slotId);
  };

  /**
   * Handles clicking the confirmation button after editing a schedule.
   */

  const editSaveChangesHandler = () => {
    //Because of onChange, nothing else must be done; must add Axios call after backend connection
    updateScheduleInformation();
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
    return (
      (mode === BusScheduleViewModes.EDIT_SCHEDULE ||
        mode === BusScheduleViewModes.CREATE_SCHEDULE) &&
      currentSlot === undefined
    );
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
                buttonsDisabled={isInSlotCreateMode()}
                onDeleteScheduleClick={deleteScheduleHandler}
                onEditScheduleClick={editScheduleHandler}
                onCreateScheduleClick={handleCreateSchedule}
              />
            )}
            {formIsOpen() && (
              <BusScheduleForm
                schedule={currentSchedule!}
                location={currentLocation!}
                mode={
                  mode === BusScheduleViewModes.CREATE_SCHEDULE
                    ? mode
                    : BusScheduleViewModes.EDIT_SCHEDULE
                }
                onSelectChange={handleCreateScheduleOptionChange}
                onCancelClick={handleCancelScheduleEditing}
                onCreateClick={createSchedule}
                onUpdateClick={editSaveChangesHandler}
                unassignedLocations={getUnassignedLocations()}
                assignedLocations={getAssignedLocations()}
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
                onSlotCreation={createSlotHandler}
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
