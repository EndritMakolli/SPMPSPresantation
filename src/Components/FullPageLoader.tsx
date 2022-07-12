import LoaderSvg from "../Media/Loader.svg";

export const FullPageLoader = () => {
  return (
    <div className="loader-fullpage">
      <img src={LoaderSvg} alt="loading-animation" />
    </div>
  );
};
