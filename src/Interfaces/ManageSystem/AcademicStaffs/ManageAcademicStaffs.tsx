import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import { Loader } from "../../../Components/Loader";
import { useStore } from "../../../Stores/Store";
import { ViewModes } from "../../../Stores/StudentStore";
import { ManageAcademicStaffsHeader } from "./ManageAcademicStaffsHeader";
import { ManageAcademicStaffsDetails } from "./ManageAcademicStaffDetails";
import { ManageAcademicStaffsForm } from "./ManageAcademicStaffsForm";
import { ManageAcademicStaffsTable } from "./ManageAcademicStaffsTable";

export default observer(function ManageAcademicStaffs() {
  const {
    selectAcademicStaff,
    loading,
    setMode,
    deselectAcademicStaff,
    inReadMode,
    inDetailsMode,
    currentAcademicStaff,
    deleteAcademicStaff,
    inEditMode,
    setDefaultAcademicStaff,
    inCreateMode,
    createAcademicStaff,
    updateCurrentAcademicStaff,
    updateAcademicStaff,
    filterAcademicStaffs,
    filteredAcademicStaffs,
  } = useStore().academicStaffStore;

  const filterInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    filterAcademicStaffs(e.currentTarget.value);
  };

  const detailsClickHandler = (userId: string) => {
    selectAcademicStaff(userId);
    setMode(ViewModes.DETAILS);
  };

  const onReturnClickHandler = () => {
    deselectAcademicStaff();
    setMode(ViewModes.READ);
  };

  const onDeleteClickHandler = () => {
    deleteAcademicStaff();
    setMode(ViewModes.READ);
  };

  const onEditClickHandler = () => {
    setMode(ViewModes.EDIT);
  };

  /**
   * Handles clicking the "register student" button on the manage students header component.
   */

  const onRegisterClickHandler = () => {
    setDefaultAcademicStaff();
    setMode(ViewModes.CREATE);
  };

  const onConfirmEditClickHandler = () => {
    console.log("saved changes");
    updateAcademicStaff();
    setMode(ViewModes.DETAILS);
  };

  const onRegisterAcademicStaffClickHandler = () => {
    createAcademicStaff();
    setMode(ViewModes.READ);
  };

  const onFormInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    updateCurrentAcademicStaff({
      ...currentAcademicStaff!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h1>Menaxho stafin akademik</h1>
      <section className="contents">
        {loading && <Loader />}
        {!loading && (
          <>
            {inReadMode() && (
              <>
                <ManageAcademicStaffsHeader
                  onFilterInputChange={filterInputChangeHandler}
                  onRegisterClick={onRegisterClickHandler}
                />
                <ManageAcademicStaffsTable
                  academicStaffs={filteredAcademicStaffs}
                  onDetailsClick={detailsClickHandler}
                />
              </>
            )}
            {inDetailsMode() && (
              <ManageAcademicStaffsDetails
                academicStaff={currentAcademicStaff!}
                onReturnClick={onReturnClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={onEditClickHandler}
              />
            )}
            {(inEditMode() || inCreateMode()) && (
              <ManageAcademicStaffsForm
                onEditClick={onConfirmEditClickHandler}
                onRegisterClick={onRegisterAcademicStaffClickHandler}
                onFormInputChange={onFormInputChangeHandler}
                academicStaff={currentAcademicStaff!}
                onCancelClick={onReturnClickHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});
