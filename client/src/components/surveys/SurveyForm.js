// SurveyNew shows SurveyForm and SurveyFormReview
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
    renderFields() {
        // ({ label, name }) destructures each object in the FIELDS array
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                    key={name}
                />
            );
        });
    }

    render() {
        return (
            <div>
                {/* handleSubmit is injected by reduxForm() at bottom */}
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        console.log(values)
                    )}
                >
                    {/* Field require props to know how to render itself. The name
                property can be any String. The name property tells redux that
                we have one piece of data being produced by our form called
                "surveyTitle". The component property tells redux-form that this
                Field should appear as an HTML input tag. The type property
                means the input need to be text.
                <Field type="text" name="surveyTitle" component="input" /> */}
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        className="teal btn-flat right white-text"
                        type="submit"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

// reduxForm is like connect(), takes only one argument
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
