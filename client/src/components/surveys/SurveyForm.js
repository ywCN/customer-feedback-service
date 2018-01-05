import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

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
                        this.props.onSurveySubmit()
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

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || ''); // || '' avoid undefined

    // for each field
    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            // [name] means property, not 'name' property
            // key interpolation???
            errors[name] = 'You must provide a value';
        }
    });

    // if it is still empty, Redux-Form will assume it is valid
    // ReduxForm does not care undefined property
    return errors;
}

// reduxForm is like connect(), takes only one argument
export default reduxForm({
    validate: validate,
    form: 'surveyForm'
})(SurveyForm);
