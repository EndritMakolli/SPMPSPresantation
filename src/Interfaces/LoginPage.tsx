import { ChangeEvent, useState } from "react";
import "../Style/LoginPage.css";

interface LoginProps {
  login: (user: {}) => void;
}

interface Credentials {
  email: string;
  password: string;
}

export const LoginPage = ({ login }: LoginProps) => {
  const [credentials, setCredentials] = useState<Credentials>(
    {} as Credentials
  );

  const handleCredentialsInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials({
      ...credentials,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const LogIn = async () => {
    console.log(credentials);
    await login(credentials);
  };

  return (
    <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
      <h2 id="LoginPageh2">KYÇUNI NË SISTEM</h2>
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
  );
};
