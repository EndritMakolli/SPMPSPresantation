import "../Style/Njoftimet.css";

export const Njoftimet = () => {
  return (
    <div className="postsOuterDiv">
      <div className="postsMainContainer">
        <input
          type="date"
          id="PostFilter"
          className="postsInputs"
          value="Filtro sipas datës..."
        ></input>
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

const Post = () => {
  return (
    <>
      <div className="thePost">
        <div className="postHeader">
          <div className="postHeaderInfo">
            <h1>Njoftim për grupin G3a</h1>
            <h3>12 Maj, 2022</h3>
          </div>
          <input
            type="text"
            id="postAudience"
            className="postsInputs"
            placeholder="CSE1920"
            readOnly
            disabled
          ></input>
        </div>
        <p className="postContent">Përshëndetje juve</p>
      </div>
    </>
  );
};
