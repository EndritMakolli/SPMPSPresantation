import React from 'react';
import "../Style/Form.css";

const Form = () => {
    return(
        <h1>Test</h1>
    );
}
const FormButton = () => {
    return(
        <button className='form-button'>Click Me!</button>
    );
}

Form.FormButton = FormButton;

export default Form;