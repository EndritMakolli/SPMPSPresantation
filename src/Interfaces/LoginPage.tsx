import "../Style/LoginPage.css";


export const LoginPage = () => {
    return (
      <div className="mainContainer">
        <div className="rolesDiv">
          <div className="formIconContainers">
            <img className="LoginPageImage" src={require('../Media/userIcon.jpeg')}/>
            <h4>Student</h4>
          </div>
          <div className="formIconContainers">
            <img className="LoginPageImage" src={require('../Media/userIcon.jpeg')}/>
            <h4>Profesor</h4>
          </div>
          <div className="formIconContainers">
            <img className="LoginPageImage" src={require('../Media/userIcon.jpeg')}/>
            <h4>Admin</h4>
          </div>
        </div>
        <br/>
        <br/>
        <form className="loginForm" action="" >
          <h2 id="LoginPageh2">Kycuni ne sistem</h2>
          <br/>
          <input type="text" className="loginFormInputs" placeholder="ID-ja ..." required></input>
          <input type="password" className="loginFormInputs" placeholder="Fjalkalimi ..." required></input>
          <br/>
          <button className="loginbutton">Kycu</button>
        </form>
      </div>
    );
  };
  