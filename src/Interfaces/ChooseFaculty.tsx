import { Link } from "react-router-dom";
import "../Style/ChooseFaculty.css";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

interface ChooseFacultyProps {
  setFaculty: (b: boolean) => void;
}

export const ChooseFaculty = ({ setFaculty }: ChooseFacultyProps) => {
  return (
    <section id="chooseFaculty">
      <h1>
        Ju lutem zgjedhni fakultetin për të cilin doni të shihni informatat
      </h1>
      <div>
        <Link to="profile/personal">
          <article onClick={() => setFaculty(true)}>
            <AccountBalanceOutlinedIcon fontSize="large" />
            <p>Shkenca Kompjuterike dhe Inxhinieri</p>
            <p>Bachelor</p>
          </article>
        </Link>
        <Link to="profile/personal">
          <article>
            <AccountBalanceOutlinedIcon fontSize="large" />
            <p>Shkenca Kompjuterike dhe Inxhinieri</p>
            <p>Bachelor</p>
          </article>
        </Link>
        <Link to="profile/personal">
          <article>
            <AccountBalanceOutlinedIcon fontSize="large" />
            <p>Shkenca Kompjuterike dhe Inxhinieri</p>
            <p>Bachelor</p>
          </article>
        </Link>
        <Link to="profile/personal">
          <article>
            <AccountBalanceOutlinedIcon fontSize="large" />
            <p>Shkenca Kompjuterike dhe Inxhinieri</p>
            <p>Bachelor</p>
          </article>
        </Link>
      </div>
    </section>
  );
};
