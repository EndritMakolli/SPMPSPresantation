interface DataFieldProps {
  label: string;
  contents: string;
}

export const DataField = ({ label, contents }: DataFieldProps) => {
  return (
    <>
      <label htmlFor="span">{label}</label>
      <span className="dataField">{contents}</span>
    </>
  );
};
