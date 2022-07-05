import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import { Loader } from "../../../Components/Loader";
import { useStore } from "../../../Stores/Store";
import { ViewModes } from "../../../Stores/CourseStore";
import { ManageCoursesDetails } from "./ManageCourseDetails";
import { ManageCoursesForm } from "./ManageCoursesForm";
import { ManageCoursesHeader } from "./ManageCoursesHeader";
import { ManageCoursesTable } from "./ManageCoursesTable";

export default observer(function ManageCourses() {
  const {
    selectCourse,
    loading,
    setMode,
    deselectCourse,
    inReadMode,
    inDetailsMode,
    currentCourse,
    deleteCourse,
    inEditMode,
    setDefaultCourse,
    inCreateMode,
    createCourse,
    updateCurrentCourse,
    updateCourse,
    filterCourses,
    filteredCourses,
  } = useStore().courseStore;

  const filterInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    filterCourses(e.currentTarget.value);
  };

  const detailsClickHandler = (courseId: string) => {
    selectCourse(courseId);
    setMode(ViewModes.DETAILS);
  };

  const onReturnClickHandler = () => {
    deselectCourse();
    setMode(ViewModes.READ);
  };

  const onDeleteClickHandler = () => {
    deleteCourse();
    setMode(ViewModes.READ);
  };

  const onEditClickHandler = () => {
    setMode(ViewModes.EDIT);
  };

  /**
   * Handles clicking the "register course" button on the manage courses header component.
   */

  const onRegisterClickHandler = () => {
    setDefaultCourse();
    setMode(ViewModes.CREATE);
  };

  const onConfirmEditClickHandler = () => {
    console.log("saved changes");
    updateCourse();
    setMode(ViewModes.DETAILS);
  };

  const onRegisterCourseClickHandler = () => {
    createCourse();
    setMode(ViewModes.READ);
  };

  const onFormInputChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    updateCurrentCourse({
      ...currentCourse!,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <h1>Menaxho lendet</h1>
      <section className="contents">
        {loading && <Loader />}
        {!loading && (
          <>
            {inReadMode() && (
              <>
                <ManageCoursesHeader
                  onFilterInputChange={filterInputChangeHandler}
                  onRegisterClick={onRegisterClickHandler}
                />
                <ManageCoursesTable
                  courses={filteredCourses}
                  onDetailsClick={detailsClickHandler}
                />
              </>
            )}
            {inDetailsMode() && (
              <ManageCoursesDetails
                course={currentCourse!}
                onReturnClick={onReturnClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onEditClick={onEditClickHandler}
              />
            )}
            {(inEditMode() || inCreateMode()) && (
              <ManageCoursesForm
                onEditClick={onConfirmEditClickHandler}
                onRegisterClick={onRegisterCourseClickHandler}
                onFormInputChange={onFormInputChangeHandler}
                course={currentCourse!}
                onCancelClick={onReturnClickHandler}
              />
            )}
          </>
        )}
      </section>
    </>
  );
});


