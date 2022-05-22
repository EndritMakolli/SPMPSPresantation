import { ChangeEvent, useState } from "react";
import { useStore } from "../Stores/Store";
import "../Style/LoginPage.css";

interface Credentials {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [credentials, setCredentials] = useState<Credentials>(
    {} as Credentials
  );

  const { logIn } = useStore().userStore;

  const handleCredentialsInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials({
      ...credentials,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const LogIn = async () => {
    await logIn(credentials);
  };

  return (
    <div className="col4 off4">
      <div className="login-background"></div>
      <form
        className="border-radius-light "
        onSubmit={(e) => e.preventDefault()}
      >
        <h2>KYÇUNI NË SISTEM</h2>
        <input
          type="text"
          name="email"
          placeholder="ID apo email adresa..."
          onChange={handleCredentialsInputChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Fjalëkalimi ..."
          onChange={handleCredentialsInputChange}
          required
        ></input>
        <button className="loginbutton" onClick={LogIn}>
          KYÇU
        </button>
      </form>
    </div>
  );
};
