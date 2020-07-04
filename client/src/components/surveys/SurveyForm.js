// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm function allows our component to communicate with the redux store at the top of our application that is enclosed by that provider tag
// field: a helper provided by redux form for rendering absolutely any type of traditional HTML form
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

  renderFields() {
    return _.map(formFields,({label ,name }) => {
      return (

      <Field key={name}
      component = {SurveyField}
       type ="text"
       label ={label}
       name={name}
       />
     );
    });

  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className= "teal btn-flat right white-text">
            NEXT
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients=validateEmails(values.recipients || '');

  _.each(formFields,({ name })=>{
    if(!values[name]){
      errors[name]='you must provide a value';
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
