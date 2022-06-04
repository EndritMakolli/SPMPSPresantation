import { observer } from "mobx-react";
import { Loader } from "../Loader";
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
    updateSlot,
    currentSlot,
    setScheduleCreateMode,
    setSlotCreateMode,
    isLoading,
    saveChangesToSlot,
    setSlotEditMode,
    setReadMode,
    getUnassignedLocations,
    updateSchedule,
    setScheduleEditingMode,
    createSchedule,
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

  const saveEditedSlotHandler = () => {
    saveChangesToSlot();
  };

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
   * Handles clicking the confirmation button after editing a schedule.
   */

  const editSaveChangesHandler = () => {
    //Because of onChange, nothing else must be done; must add Axios call after backend connection
    setReadMode();
  };

  /**
   * Handles clicking the X icon while editing a schedule slot.
   */

  const cancelSlotEditingHandler = () => {
    setReadMode();
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
            {!formIsOpen() && (
              <BusScheduleHeading
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
                locations={getUnassignedLocations()}
                onInputChange={handleScheduleInputChange}
              />
            )}
            {!formIsOpen() && (
              <BusScheduleTable
                adminMode
                mode={mode!}
                slots={currentSchedule?.slots!}
                currentSlot={currentSlot}
                onSlotCreateClick={handleSlotCreate}
                onSlotEditCancel={cancelSlotEditingHandler}
                onSlotEditClick={editSlotHandler}
                onSlotEditSave={saveEditedSlotHandler}
                onSlotInputChange={slotInputChangeHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});
