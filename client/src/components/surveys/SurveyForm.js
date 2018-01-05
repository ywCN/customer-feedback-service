import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        // ({ label, name }) destructures each object in the FIELDS array
        return _.map(formFields, ({ label, name }) => {
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
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
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
    _.each(formFields, ({ name }) => {
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
    // validate: validate,
    validate, // ES6
    form: 'surveyForm',
    destroyOnUnmount: false // tells reduxForm not to dump stuffs
})(SurveyForm);
