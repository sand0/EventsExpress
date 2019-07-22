﻿import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderTextField } from '../helpers/helpers';
import './event-form.css';
import Button from "@material-ui/core/Button";
import 'react-widgets/dist/css/react-widgets.css'

import { DropdownList } from 'react-widgets';

import DropZoneField from '../helpers/DropZoneField';

const enhanceWithPreview = files =>
  files.map(file =>
    Object.assign({}, file, {
      preview: URL.createObjectURL(file),
    })
  )

const withPreviews = dropHandler => (accepted, rejected) =>
  dropHandler(enhanceWithPreview(accepted), rejected)

  const imageIsRequired = value => (!value ? "Required" : undefined);




export class EventForm extends Component {

    state = { imagefile: [] };
    
    handleFile(fieldName, event) {
        event.preventDefault();
        // convert files to an array
        const files = [ ...event.target.files ];
    }
    handleOnDrop = (newImageFile, onChange) => {
        const imagefile = {
          file: newImageFile[0],
          name: newImageFile[0].name,
          preview: URL.createObjectURL(newImageFile[0]),
          size: newImageFile[0].size
        };
        this.setState({ imagefile: [imagefile] }, () => onChange(imagefile));
      };
    
      resetForm = () => this.setState({ imagefile: [] }, () => this.props.reset());

      renderCountries = (arr) =>{
        
        return arr.map((item) => {

          return item;
        });
      }

    render() {

        const { countries } = this.props;

        let countries_list = this.renderCountries(countries);

        return (
            <form onSubmit={ this.props.handleSubmit } encType="multipart/form-data">
 
                    <Field
          name="image"
          component={DropZoneField}
          type="file"
          imagefile={this.state.imagefile}
          handleOnDrop={this.handleOnDrop}
          validate={[imageIsRequired]}
        />        
        <button
        type="button"
        className="uk-button uk-button-default uk-button-large clear"
        disabled={this.props.pristine || this.props.submitting}
        onClick={this.resetForm}
        style={{ float: "right" }}
      >
        Clear
      </button>

                    <div className="text text-2 pl-md-4">
                        <Field name='title' component={renderTextField} type="input" label="Title" />
                            <div className="meta-wrap">
                                <p className="meta">    
                                <span><i className="fa fa-calendar mr-2"></i>
                        <Field name='date_from' component="input" type="date" label="" /></span>
                                <span><a href="single.html"><i className="fa fa-folder mr-2"></i>Travel</a></span>
                                <span><i className="fa fa-comment mr-2"></i>2 Comment</span>
                                </p>
                            </div>
                            
                        <Field name='description' component={renderTextField} type="input" label="Description" />
                            <p><a href="#" className="btn-custom">Read More <span className="ion-ios-arrow-forward"></span></a></p>
                        
                        <Field name='country' component={() => (<DropdownList busy defaultValue="Country" 
                            textField={"name"} valueField={"id"}
                            data={countries_list} busySpinner={
                            <span className="fas fa-sync fa-spin" />
                        }/>)} />
                        
                            
                    </div>
                <Button fullWidth={true} type="submit" value="Login" color="primary" disabled={this.props.submitting}>
                   Save
                </Button>
            </form>
        );
    }

}

EventForm = reduxForm({
    form: 'event-form'
})(EventForm);

export default EventForm;
 