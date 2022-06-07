import LoaderSvg from "../Media/Loader.svg";

export const Loader = () => {
  return (
    <div className="loader">
      <img src={LoaderSvg} alt="loading-animation" />
      <p className="font-large">Ju lutem prisni...</p>
    </div>
  );
};
