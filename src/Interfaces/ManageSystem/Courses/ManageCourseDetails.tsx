import { Course } from "../../../Types/Course";

interface Props {
  course: Course;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReturnClick: () => void;
}

export const ManageCoursesDetails = ({
  course,
  onDeleteClick,
  onEditClick,
  onReturnClick,
}: Props) => {
  return (
    <article>
      <div className="column justify-center align-center col-6 off-3">
        <h2 className="mg-lg bold">Detajet e lendes</h2>
        <p className="font-large mg-lg underlined">
          {course.courseCode + " - " + course.courseName}
        </p>
        <p className="font-medium mg-lg underlined">{" Kredite: "+course.ECTS}</p>
        <p className="font-medium mg-lg underlined">{" Kategoria: "+course.courseCategory}</p>
        <p className="font-medium mg-lg underlined"></p>
        <p className="font-medium mg-lg underlined">
          <span className="bold">
            {" Semestri: " + course.semester.semesterName}
          </span>
          <span className="bold">
            {" Specializimi: " + course.specializations.specializationName}
          </span>
        </p>
        <p className="font-medium mg-lg underlined">
          IDja lendes -
          <span className="bold">{" " + course.courseId}</span>
        </p>
        <p className="font-medium mg-lg underlined">
          {course.academicStaff.map((academicStaff) => {
            return <p>{"Stafi: "+academicStaff.firstName}</p>;
          })}
        </p>
        <div className="row justify-center mg-lg">
          <button onClick={onDeleteClick}>FSHIJ</button>
          <button onClick={onEditClick}>EDITO</button>
          <button onClick={onReturnClick}>KTHEHU</button>
        </div>
      </div>
    </article>
  );
};


