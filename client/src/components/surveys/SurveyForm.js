// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
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
                means the input need to be text. */}
                    <Field type="text" name="surveyTitle" component="input" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

// reduxForm is like connect(), takes only one argument
export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
