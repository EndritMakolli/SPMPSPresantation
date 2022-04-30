import "../../Style/Semester.css";

export const Semester = () => {
  return (
    <>
      <h1>Semestri</h1>
      <section className="contents" id="semester">
        <article id="register-semester">
          <h2>Regjistro semestrin</h2>
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <div className="form-item">
              <label htmlFor="">Semestri</label>
              <select name="" id="">
                <option value="">Semestri 1</option>
                <option value="">Semestri 2</option>
                <option value="">Semestri 3</option>
                <option value="">Semestri 4</option>
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="">Orari</label>
              <select name="" id="">
                <option value="">Paradite</option>
                <option value="">Pasdite</option>
              </select>
            </div>
            <div className="form-item">
              <button onClick={() => console.log(23)}>REGJISTRO</button>
            </div>
          </form>
          <p className="message">
            Të dhënat e regjistrimit u ruajtën me sukses!
          </p>
        </article>
        <span className="dotted-line"></span>
        <article id="semester-info">
          <h2>Informata rreth semestrit</h2>
          <form action="">
            <div className="form-item">
              <span>Momentalisht jeni në semestrin e 3-të</span>
            </div>
            <span className="horizontal-line-white"></span>
            <div className="form-item">
              <span>
                Ju keni regjistruar këtë semestër në datën 3 Mars, 2022
              </span>
            </div>
            <span className="horizontal-line-white"></span>
            <div className="form-item">
              <span>Jeni të regjistruar në orarin e pasditës</span>
            </div>
          </form>
        </article>
      </section>
    </>
  );
};
