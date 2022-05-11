import { DatePicker } from "../Components/Common/DatePicker";
import "../Style/Posts.css";

export const Posts = () => {
  return (
    <>
      <h1>Postimet</h1>
      <section className="contents" id="posts">
        <DatePicker info="Filtro sipas datës" />
        <Post />
        <Post />
      </section>
    </>
  );
};

const Post = () => {
  return (
    <article className="post">
      <div className="postHeader">
        <h2>Njoftim për anulim të orëve për festën e Europës</h2>
        <h3>13 Maj, 2022</h3>
        <p className="postGroup">CSE1920</p>
      </div>
      <div className="postBody">
        Përshëndetje studentë,
        <br />
        Lajmëroheni se të nesërmen nuk do të mbahen orë. Orët zëvendësohen të
        nesërmen më <b>22.12.2000</b>
      </div>
    </article>
  );
};
