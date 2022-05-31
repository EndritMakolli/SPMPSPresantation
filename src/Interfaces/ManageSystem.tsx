import { ManageOption } from "./ManageSystem/ManageOption";
import { Options } from "./ManageSystem/ManagingOptions";
import "../Style/ManageOption.css";

export const ManageSystem = () => {
  return (
    <>
      <h1>Menaxho sistemin</h1>
      <section className="contents">
        <div className="row">
          {Options.map((option) => {
            return (
              <ManageOption
                image={option.image}
                text={option.name}
                link={option.link}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};
