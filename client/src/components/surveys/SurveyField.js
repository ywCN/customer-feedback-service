// SurveyField contains logic to render a single label and text input
import React from 'react';

// destructure, input is one property that contains a lot of event handlers
// meta contains error and touched property
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
            {touched && error}
        </div>
    );
};
