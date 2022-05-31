import { Message } from "../../Components/Common/Message";
import "../../Style/Semester.css";

export const Semester = () => {
  return (
    <>
      <h1>Semestri</h1>
      <section className="contents" id="semester">
        <article className="full-height-column justify-between">
          <h2>Regjistro semestrin</h2>
          <form className="" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="select">Semestri i studimeve</label>
            <select name="" id="">
              <option value="">Semestri 1</option>
              <option value="">Semestri 2</option>
              <option value="">Semestri 3</option>
              <option value="">Semestri 4</option>
            </select>
            <label htmlFor="">Termini i orarit</label>
            <select name="" id="">
              <option value="">Paradite</option>
              <option value="">Pasdite</option>
            </select>
            <button>REGJISTRO</button>
          </form>
          <Message
            contents="Të dhënat e regjistrimit u përditësuan me sukses!"
            type="info"
          />
        </article>
        <span className="dotted-line"></span>
        <article className="full-height-column">
          <h2>Informata rreth semestrit</h2>
          <Message
            contents="Momentalisht jeni në semestrin e parë të studimeve!"
            type="info"
          />
          <Message
            contents="Ju keni regjistruar këtë semestër me datën 22 Maj, 2022"
            type="info"
          />
          <Message
            contents="Orari i regjistruar është i pasditës"
            type="info"
          />
        </article>
      </section>
    </>
  );
};
