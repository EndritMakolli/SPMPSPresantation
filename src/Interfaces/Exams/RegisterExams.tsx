export const RegisterExams = () => {
  return (
    <>
      <h1>Paraqit provime</h1>
      <section className="contents" id="registeredExams">
        <table>
          <thead>
            <th>Lënda</th>
            <th>Profesori</th>
            <th>Kategoria</th>
            <th>Kreditë</th>
            <th>Semestri</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>Arkitekturë Softuerike</td>
              <td>
                <Select />
              </td>
              <td>Obligative</td>
              <td>5 ECTS</td>
              <td>Semestri 6</td>
              <td>
                <button style={{ minWidth: 100, padding: 10 }}>Paraqit</button>
              </td>
            </tr>
            <tr>
              <td>Arkitekturë Softuerike</td>
              <td>
                <Select />
              </td>
              <td>Obligative</td>
              <td>5 ECTS</td>
              <td>Semestri 6</td>
              <td>
                <button style={{ minWidth: 100, padding: 10 }}>Paraqit</button>
              </td>
            </tr>
            <tr>
              <td>Arkitekturë Softuerike</td>
              <td>
                <Select />
              </td>
              <td>Obligative</td>
              <td>5 ECTS</td>
              <td>Semestri 6</td>
              <td>
                <button style={{ minWidth: 100, padding: 10 }}>Paraqit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

const Select = () => {
  return (
    <select name="" id="">
      <option value="">Ramiz Hoxha</option>
      <option value="">Xhelal Jashari</option>
      <option value="">Medina Shamolli</option>
    </select>
  );
};
