// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // init state without babel
    // constructor(props) {
    //     super(props);
    //     this.state = { showFormReview: false }; // component level state
    // }

    // this initialization works because of babel
    // component level state for navigation between SurveyForm and SurveyFormReview
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }

        return (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }
    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: 'surveyForm'
    // destroyOnUnmount is true by default
})(SurveyNew);
