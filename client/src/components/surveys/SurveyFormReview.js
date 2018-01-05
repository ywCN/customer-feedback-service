import React from 'react';

const SurveyFormReview = ({ onCancel }) => {
    return (
        <div>
            <h5>Please confirm.</h5>
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        formValues: state.from.surveyFrom.values
    };
}

export default SurveyFormReview;
