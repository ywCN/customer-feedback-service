// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    // init state without babel
    // constructor(props) {
    //     super(props);
    //     this.state = { showFormReview: false }; // component level state
    // }

    // this initialization works because of babel
    state = { showFormReview: false }; // component level state

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

export default SurveyNew;
