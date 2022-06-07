import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import { Loader } from "../../../Components/Loader";
import { useStore } from "../../../Stores/Store";
import { ViewModes } from "../../../Stores/StudentStore";
import { ManageStudentsDetails } from "./ManageStudentDetails";
import { ManageStudentsForm } from "./ManageStudentsForm";
import { ManageStudentsHeader } from "./ManageStudentsHeader";
import { ManageStudentsTable } from "./ManageStudentsTable";

export default observer(function ManageStudents() {
  const {
    selectStudent,
    loading,
    setMode,
    deselectStudent,
    inReadMode,
    inDetailsMode,
    currentStudent,
    deleteStudent,
    inEditMode,
    setDefaultStudent,
    inCreateMode,
    createStudent,
    updateCurrentStudent,
    updateStudent,
    filterStudents,
    filteredStudents,
  } = useStore().studentStore;

  const filterInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    filterStudents(e.currentTarget.value);
  };

  const detailsClickHandler = (userId: string) => {
    selectStudent(userId);
    setMode(ViewModes.DETAILS);
  };

  const onReturnClickHandler = () => {
    deselectStudent();
    setMode(ViewModes.READ);
  };

  const onDeleteClickHandler = () => {
    deleteStudent();
    setMode(ViewModes.READ);
  };

  const onEditClickHandler = () => {
    setMode(ViewModes.EDIT);
  };

  /**
   * Handles clicking the "register student" button on the manage students header component.
   */

  const onRegisterClickHandler = () => {
    setDefaultStudent();
    setMode(ViewModes.CREATE);
  };

  const onConfirmEditClickHandler = () => {
    console.log("saved changes");
    updateStudent();
    setMode(ViewModes.DETAILS);
  };

  const onRegisterStudentClickHandler = () => {
    createStudent();
    setMode(ViewModes.READ);
  };

  const onFormInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    updateCurrentStudent({
      ...currentStudent!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h1>Menaxho studentët</h1>
      <section className="contents">
        {loading && <Loader />}
        {!loading && (
          <>
            {inReadMode() && (
              <>
                <ManageStudentsHeader
                  onFilterInputChange={filterInputChangeHandler}
                  onRegisterClick={onRegisterClickHandler}
                />
                <ManageStudentsTable
                  students={filteredStudents}
                  onDetailsClick={detailsClickHandler}
                />
              </>
            )}
            {inDetailsMode() && (
              <ManageStudentsDetails
                student={currentStudent!}
                onReturnClick={onReturnClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={onEditClickHandler}
              />
            )}
            {(inEditMode() || inCreateMode()) && (
              <ManageStudentsForm
                onEditClick={onConfirmEditClickHandler}
                onRegisterClick={onRegisterStudentClickHandler}
                onFormInputChange={onFormInputChangeHandler}
                student={currentStudent!}
                onCancelClick={onReturnClickHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});
