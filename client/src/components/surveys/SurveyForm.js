// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; // like connect

class SurveyForm extends Component {
    render() {
        return <div>SurveyForm!</div>;
    }
}

// reduxForm takes only one argument
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
