// SurveyField contains logic to render a single label and text input
import React from 'react';

// destructure, input is one property that contains a lot of event handlers
export default ({ input, label, meta }) => {
    console.log(meta); // meta contains error property
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
};
