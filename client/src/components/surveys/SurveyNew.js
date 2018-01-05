// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showReview: false }; // component level state

    render() {
        return (
            <div>
                <SurveyForm />
            </div>
        );
    }
}

export default SurveyNew;
