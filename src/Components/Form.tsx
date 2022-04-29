import React from "react";
import "../Style/Form.css";

const Form = () => {
  return <h1>Test</h1>;
};

interface FormButtonProps {
  disabled?: boolean;
}

const FormButton = ({ disabled = false }: FormButtonProps) => {
  return (
    <button className={"form-button" + (disabled && " disabled")}>
      Click Me!
    </button>
  );
};

Form.FormButton = FormButton;

export default Form;
