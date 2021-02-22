import React, { Component } from 'react';
import EventForm from '../components/event/event-form';
import { edit_event } from '../actions/add-event';
import { publish_event } from '../actions/add-event';
import { connect } from 'react-redux';
import { formValues, getFormValues, reset } from 'redux-form';
import { setEventError, setEventPending, setEventSuccess } from '../actions/add-event';
import { validateEventForm } from '../components/helpers/helpers'
import { resetEvent } from '../actions/event-item-view';
import Button from "@material-ui/core/Button";
import get_categories from '../actions/category/category-list';
import L from 'leaflet';
import { 
    isPristine,
} from 'redux-form'

class EditEventWrapper extends Component {

    componentWillMount = () => {
        this.props.get_categories();
    }
    
    componentDidUpdate = () => {
        if (!this.props.add_event_status.errorEvent && this.props.add_event_status.isEventSuccess) {
            this.props.reset();
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onPublish = async (values) => { 
        
        if (!this.props.pristine)
        {
            await this.props.add_event({ ...validateEventForm(this.props.form_values), user_id: this.props.user_id, id: this.props.event.id });
        }
         return await this.props.publish(this.props.event.id);
        
    }

    onSave = () => {
        return this.props.add_event({ ...validateEventForm(this.props.form_values), user_id: this.props.user_id, id: this.props.event.id });
    }

    
    

    render() {
        let initialValues = {
            ...this.props.event,
            selectedPos: L.latLng(
                this.props.event.latitude, 
                this.props.event.longitude)

        }
        const { pristine } = this.props
        console.log(this.props.form_values)
        return <>
           
            <EventForm
                all_categories={this.props.all_categories}
                onCancel={this.props.onCancelEditing}
                onSubmit={this.onPublish}
                onPublish={this.onSave}
                initialValues={initialValues}
                form_values={this.props.form_values}
                checked={this.props.event.isReccurent}
                haveReccurentCheckBox={false}
                disabledDate={false}
                isCreated={true} ><div className="col">
                    <Button
                        className="border"
                        fullWidth={true}
                        color="primary"
                        onClick={this.onSave}
                    >
                        Save
                        </Button>
                </div>
                <div className="col">
                    <Button
                        className="border"
                        fullWidth={true}
                        color="primary"
                        type="submit"
                        >
                        Publish
                        </Button>
                </div>
                <div className="col">
                    <Button
                        className="border"
                        fullWidth={true}
                        color="primary"
                        onClick={this.handleClick}>
                        Cancel
                        </Button>
                </div></EventForm>
        </>
    }
}   

const mapStateToProps = (state) => ({
    user_id: state.user.id,
    add_event_status: state.add_event,
    all_categories: state.categories,
    form_values: getFormValues('event-form')(state),
    pristine: isPristine('event-form')(state),
    event: state.event.data,
});

const mapDispatchToProps = (dispatch) => {
    return {
        add_event: (data) => dispatch(edit_event(data)),
        publish: (data) => dispatch(publish_event(data)),
        get_categories: () => dispatch(get_categories()),
        resetEvent: () => dispatch(resetEvent()),
        reset: () => {
            dispatch(reset('event-form'));
            dispatch(setEventPending(true));
            dispatch(setEventSuccess(false));
            dispatch(setEventError(null));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEventWrapper);