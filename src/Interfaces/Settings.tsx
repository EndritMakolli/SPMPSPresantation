import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { useStore } from "../Stores/Store";
import "../Style/Settings.css";

export const Settings = () => {
  const { logOut } = useStore().userStore;
  return (
    <>
      <h1>Settings</h1>
      <section className="contents" id="settings">
        <div className="form-item">
          <AccountBalanceOutlinedIcon fontSize="large" />
          <button>Rizgjedh fakultetin</button>
        </div>
        <div className="form-item">
          <AccountBalanceOutlinedIcon fontSize="large" />
          <button onClick={logOut}>Çkyçu nga sistemi</button>
        </div>
      </section>
    </>
  );
};
