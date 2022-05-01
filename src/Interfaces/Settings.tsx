import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import "../Style/Settings.css";

interface SettingsProps {
  logOut: () => void;
}

export const Settings = ({ logOut }: SettingsProps) => {
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
