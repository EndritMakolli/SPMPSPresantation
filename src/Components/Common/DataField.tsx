interface DataFieldProps {
  label: string;
  contents?: string;
}

export const DataField = ({ label, contents }: DataFieldProps) => {
  return (
    <>
      <label htmlFor="span">{label}</label>
      <p className="font-medium mg-lg underlined pad-lg">
        {contents || "undf"}
      </p>
      {/* <span className="dataField">{contents}</span> */}
    </>
  );
};
