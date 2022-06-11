import { SyntheticEvent } from "react";
import { Course } from "../../../Types/Course";

interface Props {
  course: Course;
  onCancelClick: () => void;
  onFormInputChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onRegisterClick: () => void;
}

export const ManageCoursesForm = ({
  course,
  onCancelClick,
  onFormInputChange,
  onEditClick,
  onRegisterClick,
}: Props) => {
  return (
    <form
      className="col-6 off-3 column justify-center align-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-center underline-white">
        {course.courseId ? "Ndrysho coursein" : "Regjistro course"}
      </h1>
      <div className="row mg-lg">
        <label htmlFor="">Kodi i lendes : </label>
        <input
          type="text"
          name="code"
          defaultValue={course.courseCode}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Emri i lendes : </label>
        <input
          type="text"
          name="name"
          defaultValue={course.courseName}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Kredite e lendes : </label>
        <input
          type="text"
          name="ects"
          defaultValue={course.ECTS}
          onChange={onFormInputChange}
        />
      </div>
      <div className="row mg-lg">
        <label htmlFor="">Kategoria e lendes : </label>
        <input
          type="text"
          name="category"
          defaultValue={course.courseCategory}
          onChange={onFormInputChange}
        />
      </div>
      <button onClick={onCancelClick}>ANULO</button>
      {!course.courseId && <button onClick={onRegisterClick}>REGJISTRO</button>}
      {course.courseId && <button onClick={onEditClick}>RUAJ NDRYSHIMET</button>}
    </form>
  );
};



