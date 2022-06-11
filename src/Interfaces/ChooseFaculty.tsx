import { Link } from "react-router-dom";
import "../Style/ChooseFaculty.css";
import FacultyIcon from "../Media/account_balance_FILL0_wght700_GRAD200_opsz48.svg";
import { useStore } from "../Stores/Store";
import { observer } from "mobx-react-lite";
import { Loader } from "../Components/Loader";

export default observer(function ChooseFaculty() {
  const {
    loading,
    setPickedFaculty,
    registeredFaculties,
    getFacultiesForUser,
  } = useStore().userStore;

  if (!registeredFaculties) getFacultiesForUser();

  const hasRegisteredFaculties = () =>
    registeredFaculties !== undefined && registeredFaculties.length !== 0;

  return (
    <>
      {
        <section className="boxshadow" id="chooseFaculty">
          <h1>
            Ju lutem zgjedhni fakultetin për të cilin doni të shihni informatat
          </h1>
          <div>
            {loading && <Loader />}
            {!loading && (
              <>
                {!hasRegisteredFaculties() && (
                  <p className="font-large">
                    Nuk jeni të regjistruar në asnjë fakultet... kontaktoni
                    administratën!
                  </p>
                )}
                {registeredFaculties?.map((item) => {
                  return (
                    <article
                      className="pad-lg"
                      onClick={() => setPickedFaculty(item)}
                    >
                      <Link to="profile/personal" key={item.facultyID}>
                        <img src={FacultyIcon} alt="" />
                        <p className="font-medium">{item.facultyName}</p>
                      </Link>
                    </article>
                  );
                })}
              </>
            )}
          </div>
        </section>
      }
    </>
  );
});
