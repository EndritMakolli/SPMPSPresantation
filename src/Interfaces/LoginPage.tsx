import "../Style/LoginPage.css";

interface LoginProps {
  login: (user: {}) => void;
}

export const LoginPage = ({ login }: LoginProps) => {
  const logPersonIn = async () => {
    let user = {
      email: (document.getElementById("login-email") as HTMLInputElement).value,
      password: (document.getElementById("login-password") as HTMLInputElement)
        .value,
    };
    await login(user);
  };

  return (
    <div className="mainContainer">
      <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
        <h2 id="LoginPageh2">KYÇUNI NË SISTEM</h2>
        <br />
        <input
          type="text"
          id="login-email"
          className="loginFormInputs"
          placeholder="ID apo email adresa..."
          required
        ></input>
        <input
          type="password"
          id="login-password"
          className="loginFormInputs"
          placeholder="Fjalëkalimi ..."
          required
        ></input>
        <br />
        <button className="loginbutton" onClick={logPersonIn}>
          KYÇU
        </button>
      </form>
    </div>
  );
};
