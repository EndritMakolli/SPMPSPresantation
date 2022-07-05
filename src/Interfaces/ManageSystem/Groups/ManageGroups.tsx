import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import { Loader } from "../../../Components/Loader";
import { useStore } from "../../../Stores/Store";
import { ViewModes } from "../../../Stores/GroupStore";
import { ManageGroupsDetails } from "./ManageGroupDetails";
import { ManageGroupsForm } from "./ManageGroupsForm";
import { ManageGroupsHeader } from "./ManageGroupsHeader";
import { ManageGroupsTable } from "./ManageGroupsTable";

export default observer(function ManageGroups() {
  const {
    selectGroup,
    loading,
    setMode,
    deselectGroup,
    inReadMode,
    inDetailsMode,
    currentGroup,
    deleteGroup,
    inEditMode,
    setDefaultGroup,
    inCreateMode,
    createGroup,
    updateCurrentGroup,
    updateGroup,
    filterGroups,
    filteredGroups,
  } = useStore().groupStore;

  const filterInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    filterGroups(e.currentTarget.value);
  };

  const detailsClickHandler = (groupId: string) => {
    selectGroup(groupId);
    setMode(ViewModes.DETAILS);
  };

  const onReturnClickHandler = () => {
    deselectGroup();
    setMode(ViewModes.READ);
  };

  const onDeleteClickHandler = () => {
    deleteGroup();
    setMode(ViewModes.READ);
  };

  const onEditClickHandler = () => {
    setMode(ViewModes.EDIT);
  };

  /**
   * Handles clicking the "register group" button on the manage groups header component.
   */

  const onRegisterClickHandler = () => {
    setDefaultGroup();
    setMode(ViewModes.CREATE);
  };

  const onConfirmEditClickHandler = () => {
    console.log("saved changes");
    updateGroup();
    setMode(ViewModes.DETAILS);
  };

  const onRegisterGroupClickHandler = () => {
    createGroup();
    setMode(ViewModes.READ);
  };

  const onFormInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    updateCurrentGroup({
      ...currentGroup!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h1>Menaxho groupët</h1>
      <section className="contents">
        {loading && <Loader />}
        {!loading && (
          <>
            {inReadMode() && (
              <>
                <ManageGroupsHeader
                  onFilterInputChange={filterInputChangeHandler}
                  onRegisterClick={onRegisterClickHandler}
                />
                <ManageGroupsTable
                  groups={filteredGroups}
                  onDetailsClick={detailsClickHandler}
                />
              </>
            )}
            {inDetailsMode() && (
              <ManageGroupsDetails
                group={currentGroup!}
                onReturnClick={onReturnClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={onEditClickHandler}
              />
            )}
            {(inEditMode() || inCreateMode()) && (
              <ManageGroupsForm
                onEditClick={onConfirmEditClickHandler}
                onRegisterClick={onRegisterGroupClickHandler}
                onFormInputChange={onFormInputChangeHandler}
                group={currentGroup!}
                onCancelClick={onReturnClickHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});


