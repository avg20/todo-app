/** client/components/TaskForm.js **/

import React from 'react';
import {Input, Form, Field, Text} from 'react-semantify';
import DatePicker from 'react-datepicker';
import Select from '../helpers/SelectControl';
import ErrorMessage from '../helpers/ErrorMessage';
import moment from 'moment';

const TaskForm = React.createClass( {
  getStatusOptions: function () {
    return [
      { value: 1, label: 'Open' },
      { value: 2, label: 'Closed' },
      { value: 3, label: 'Overdue' }
    ];
  },

  getInitialState: function () {
    return {
      due_date   : moment(),
      name       : '',
      description: '',
      status     : 1,
      priority   : 1
    };
  },

  handleChange: function ( field ) {
    switch ( field ) {
      case 'due_date':
      case'status':
        return ( val ) => {
          let obj = {};
          obj[ field ] = val;

          this.setState( obj );
        };

      default:
        return ( e ) => {
          let obj = {};
          obj[ field ] = e.target.value;

          this.setState( obj );
        };
    }
  },

  handleSubmit: function ( e ) {
    e.preventDefault();

    this.props.onAddTask( this.state );
  },

  render: function () {
    return (
      <Form className="add-form">
        <div className="ui grid three column">
          <Field className="column">
            <label>Name</label>
            <Input placeholder="Task Name..." onChange={this.handleChange('name')} value={this.state.name}/>
            <ErrorMessage>{this.props.errors.name}</ErrorMessage>
          </Field>
          <Field className="column">
            <label>Priority</label>
            <Input placeholder="Task Priority..." onChange={this.handleChange('priority')} value={this.state.priority}/>
            <ErrorMessage>{this.props.errors.priority}</ErrorMessage>
          </Field>
          <Field className="column">
            <label>Status</label>
            <Select options={this.getStatusOptions()} onChange={this.handleChange('status')} value={this.props.status}/>
            <ErrorMessage>{this.props.errors.status}</ErrorMessage>
          </Field>
        </div>
        <Field>
          <label>Description</label>
          <textarea placeholder="Task Description..." onChange={this.handleChange('description')} value={this.state.description}/>
          <ErrorMessage>{this.props.errors.description}</ErrorMessage>
        </Field>
        <Field>
          <label>Due Date</label>
          <DatePicker onChange={this.handleChange('due_date')} selected={this.state.due_date}/>
          <ErrorMessage>{this.props.errors.due_date}</ErrorMessage>
        </Field>
        <button type="submit" className="ui button" tabIndex="0" onClick={this.handleSubmit}>Add Task</button>
      </Form>
    );
  }
} );

export default TaskForm;