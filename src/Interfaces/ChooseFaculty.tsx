import { Link } from "react-router-dom";
import "../Style/ChooseFaculty.css";
import FacultyIcon from "../Media/account_balance_FILL0_wght700_GRAD200_opsz48.svg";
import { useStore } from "../Stores/Store";
import { observer } from "mobx-react-lite";

export default observer(function ChooseFaculty() {
  const { setFaculty, userFaculties, getFacultiesForUser } =
    useStore().userStore;

  if (!userFaculties) getFacultiesForUser();

  return (
    <>
      {
        <section className="boxshadow" id="chooseFaculty">
          <h1>
            Ju lutem zgjedhni fakultetin për të cilin doni të shihni informatat
          </h1>
          <div>
            {!userFaculties && (
              <p className="font-large text-white">Waiting...</p>
            )}
            {userFaculties?.map((item) => {
              return (
                <article className="pad-lg" onClick={() => setFaculty(item)}>
                  <Link to="profile/personal" key={item.facultyID}>
                    <img src={FacultyIcon} alt="" />
                    <p className="font-medium">{item.facultyName}</p>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      }
    </>
  );
});
