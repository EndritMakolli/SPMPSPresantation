import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import { Loader } from "../../../Components/Loader";
import { useStore } from "../../../Stores/Store";
import { ViewModes } from "../../../Stores/LectureHallStore";
import { ManageLectureHallsDetails } from "./ManageLectureHallDetails";
import { ManageLectureHallsForm } from "./ManageLectureHallsForm";
import { ManageLectureHallsHeader } from "./ManageLectureHallsHeader";
import { ManageLectureHallsTable } from "./ManageLectureHallsTable";

export default observer(function ManageLectureHalls() {
  const {
    selectLectureHall,
    loading,
    setMode,
    deselectLectureHall,
    inReadMode,
    inDetailsMode,
    currentLectureHall,
    deleteLectureHall,
    inEditMode,
    setDefaultLectureHall,
    inCreateMode,
    createLectureHall,
    updateCurrentLectureHall,
    updateLectureHall,
    filterLectureHalls,
    filteredLectureHalls,
  } = useStore().lectureHallStore;

  const filterInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    filterLectureHalls(e.currentTarget.value);
  };

  const detailsClickHandler = (lectureHallId: string) => {
    selectLectureHall(lectureHallId);
    setMode(ViewModes.DETAILS);
  };

  const onReturnClickHandler = () => {
    deselectLectureHall();
    setMode(ViewModes.READ);
  };

  const onDeleteClickHandler = () => {
    deleteLectureHall();
    setMode(ViewModes.READ);
  };

  const onEditClickHandler = () => {
    setMode(ViewModes.EDIT);
  };

  /**
   * Handles clicking the "register lectureHall" button on the manage lectureHalls header component.
   */

  const onRegisterClickHandler = () => {
    setDefaultLectureHall();
    setMode(ViewModes.CREATE);
  };

  const onConfirmEditClickHandler = () => {
    console.log("saved changes");
    updateLectureHall();
    setMode(ViewModes.DETAILS);
  };

  const onRegisterLectureHallClickHandler = () => {
    createLectureHall();
    setMode(ViewModes.READ);
  };

  const onFormInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    updateCurrentLectureHall({
      ...currentLectureHall!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h1>Menaxho lectureHallët</h1>
      <section className="contents">
        {loading && <Loader />}
        {!loading && (
          <>
            {inReadMode() && (
              <>
                <ManageLectureHallsHeader
                  onFilterInputChange={filterInputChangeHandler}
                  onRegisterClick={onRegisterClickHandler}
                />
                <ManageLectureHallsTable
                  lectureHalls={filteredLectureHalls}
                  onDetailsClick={detailsClickHandler}
                />
              </>
            )}
            {inDetailsMode() && (
              <ManageLectureHallsDetails
                lectureHall={currentLectureHall!}
                onReturnClick={onReturnClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={onEditClickHandler}
              />
            )}
            {(inEditMode() || inCreateMode()) && (
              <ManageLectureHallsForm
                onEditClick={onConfirmEditClickHandler}
                onRegisterClick={onRegisterLectureHallClickHandler}
                onFormInputChange={onFormInputChangeHandler}
                lectureHall={currentLectureHall!}
                onCancelClick={onReturnClickHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});

