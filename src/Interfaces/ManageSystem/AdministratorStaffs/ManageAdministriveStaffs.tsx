import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import { Loader } from "../../../Components/Loader";
import { useStore } from "../../../Stores/Store";
import { ViewModes } from "../../../Stores/AdministriveStaffStore";
import { ManageAdministriveStaffsDetails } from "./ManageAdministriveStaffDetails";
import { ManageAdministriveStaffsForm } from "./ManageAdministriveStaffsForm";
import { ManageAdministriveStaffsHeader } from "./ManageAdministriveStaffsHeader";
import { ManageAdministriveStaffsTable } from "./ManageAdministriveStaffsTable";

export default observer(function ManageAdministriveStaffs() {
  const {
    selectAdministriveStaff,
    loading,
    setMode,
    deselectAdministriveStaff,
    inReadMode,
    inDetailsMode,
    currentAdministriveStaff,
    deleteAdministriveStaff,
    inEditMode,
    setDefaultAdministriveStaff,
    inCreateMode,
    createAdministriveStaff,
    updateCurrentAdministriveStaff,
    updateAdministriveStaff,
    filterAdministriveStaffs,
    filteredAdministriveStaffs,
  } = useStore().administriveStaffStore;

  const filterInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    filterAdministriveStaffs(e.currentTarget.value);
  };

  const detailsClickHandler = (userId: string) => {
    selectAdministriveStaff(userId);
    setMode(ViewModes.DETAILS);
  };

  const onReturnClickHandler = () => {
    deselectAdministriveStaff();
    setMode(ViewModes.READ);
  };

  const onDeleteClickHandler = () => {
    deleteAdministriveStaff();
    setMode(ViewModes.READ);
  };

  const onEditClickHandler = () => {
    setMode(ViewModes.EDIT);
  };

  /**
   * Handles clicking the "register administriveStaff" button on the manage administriveStaffs header component.
   */

  const onRegisterClickHandler = () => {
    setDefaultAdministriveStaff();
    setMode(ViewModes.CREATE);
  };

  const onConfirmEditClickHandler = () => {
    console.log("saved changes");
    updateAdministriveStaff();
    setMode(ViewModes.DETAILS);
  };

  const onRegisterAdministriveStaffClickHandler = () => {
    createAdministriveStaff();
    setMode(ViewModes.READ);
  };

  const onFormInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    updateCurrentAdministriveStaff({
      ...currentAdministriveStaff!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h1>Menaxho administriveStaffët</h1>
      <section className="contents">
        {loading && <Loader />}
        {!loading && (
          <>
            {inReadMode() && (
              <>
                <ManageAdministriveStaffsHeader
                  onFilterInputChange={filterInputChangeHandler}
                  onRegisterClick={onRegisterClickHandler}
                />
                <ManageAdministriveStaffsTable
                  administriveStaffs={filteredAdministriveStaffs}
                  onDetailsClick={detailsClickHandler}
                />
              </>
            )}
            {inDetailsMode() && (
              <ManageAdministriveStaffsDetails
                administriveStaff={currentAdministriveStaff!}
                onReturnClick={onReturnClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={onEditClickHandler}
              />
            )}
            {(inEditMode() || inCreateMode()) && (
              <ManageAdministriveStaffsForm
                onEditClick={onConfirmEditClickHandler}
                onRegisterClick={onRegisterAdministriveStaffClickHandler}
                onFormInputChange={onFormInputChangeHandler}
                administriveStaff={currentAdministriveStaff!}
                onCancelClick={onReturnClickHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});


