import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Link } from "react-router-dom";
import { useStore } from "../Stores/Store";
import "../Style/Settings.css";
import ChooseFaculty from "./ChooseFaculty";

export const Settings = () => {
  const { faculty, logOut, setFaculty } = useStore().userStore;
  return (
    <>
      {!faculty && <ChooseFaculty />}
      {faculty && (
        <>
          <h1>Settings</h1>
          <section className="contents" id="settings">
            <div className="form-item">
              <AccountBalanceOutlinedIcon fontSize="large" />
              <Link to="po">
                <button onClick={() => setFaculty(undefined)}>
                  Rizgjedh fakultetin
                </button>
              </Link>
            </div>
            <div className="form-item">
              <AccountBalanceOutlinedIcon fontSize="large" />
              <button onClick={logOut}>Çkyçu nga sistemi</button>
            </div>
          </section>
        </>
      )}
    </>
  );
};
