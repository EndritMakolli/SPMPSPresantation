import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Link } from "react-router-dom";
import { useStore } from "../Stores/Store";
import "../Style/Settings.css";
import ChooseFaculty from "./ChooseFaculty";

export const Settings = () => {
  const { currentFaculty, logOut, deselectFaculty } = useStore().userStore;
  return (
    <>
      {!currentFaculty && <ChooseFaculty />}
      {currentFaculty && (
        <>
          <h1>Settings</h1>
          <section className="contents" id="settings">
            <div className="column col-6 justify-between full-height">
              <div className="row justify-around col-5">
                <AccountBalanceOutlinedIcon fontSize="large" />
                <Link to="po">
                  <button onClick={deselectFaculty}>Rizgjedh fakultetin</button>
                </Link>
              </div>
              <div className="row justify-around col-5">
                <AccountBalanceOutlinedIcon fontSize="large" />
                <button onClick={logOut}>Çkyçu nga sistemi</button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
