/** client/components/TaskForm.js **/

import React from 'react';
import { Input, Form, Field, Text } from 'react-semantify';
import DatePicker from 'react-datepicker';
import Select from '../helpers/SelectControl';
import ErrorMessage from '../helpers/ErrorMessage';
import moment from 'moment';

const TaskForm = React.createClass( {
  item: {},
  
  getStatusOptions: function () {
    return [
      { value: 1, label: 'Open' },
      { value: 2, label: 'Closed' },
      { value: 3, label: 'Overdue' }
    ];
  },
  
  getInitialState: function () {
    return {
      /*due_date:    moment(),
       name:        '',
       description: '',
       status:      1,
       priority:    1*/
      due_date:    moment(),
      name:        'Test Name',
      description: 'Test Description',
      status:      1,
      priority:    1
    };
  },
  
  handleChange: function ( field ) {
    switch ( field ) {
      case 'due_date':
        return ( val ) => {
          this.item[ field ] = val;
        };
      
      case 'priority':
        return ( e ) => {
          this.item[ field ] = parseInt( e.target.dataset.value, 10 );
        };
      
      default:
        return ( e ) => {
          this.item[ field ] = e.target.value;
        };
    }
  },
  
  handleSubmit: function ( e ) {
    e.preventDefault();
  
    this.props.onAddTask( this.item );
  },
  
  getPriorityFlagClass: function () {
    switch ( this.item.priority ) {
      case 1:
        return 'task-card__priority-flag--low flag icon';
      
      case 2:
        return 'task-card__priority-flag--medium flag icon';
      
      case 3:
        return 'task-card__priority-flag--high flag icon';
      
      default:
        return 'flag icon';
    }
  },
  
  render: function () {
    this.item = this.props.item;

    return (
      <div className="ui segments">
        <div className="ui card form task-card">
          <div className="content">
            <div className="ui input">
              <input placeholder="Task Name..." onChange={this.handleChange('name')} value={this.item.name}/>
            </div>
  
  
            <div className="ui right floated icon top left pointing dropdown basic button">
              <i className={this.getPriorityFlagClass()}/>
              <div className="menu">
                <div className="item" onClick={this.handleChange('priority')} data-value="3"><
                  i className="task-card__priority-flag--high flag icon"/>
                </div>
                <div className="item" onClick={this.handleChange('priority')} data-value="2">
                  <i className="task-card__priority-flag--medium flag icon"/>
                </div>
                <div className="item" onClick={this.handleChange('priority')} data-value="1">
                  <i className="task-card__priority-flag--low flag icon"/>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="field">
              <textarea placeholder="Task Description..." onChange={this.handleChange('description')} value={this.item.description}/>
            </div>
          </div>
          <div className="extra content">
            <div className="ui two column grid">
              <div className="column">
                <button type="submit" className="ui teal button" tabIndex="0" onClick={this.handleSubmit}>Save Task</button>
              </div>
              <div className="column">
                <DatePicker onChange={this.handleChange('due_date')} selected={moment( this.item.due_date )}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /*return (
     <div className="ui segment">
     <Form className="add-form">
     <div className="ui grid two column">
     <Field className="column">
     <label>Name</label>
     <Input placeholder="Task Name..." onChange={this.handleChange('name')} value={this.state.name}/>
     <ErrorMessage>{this.item.errors.name}</ErrorMessage>
     </Field>
     <Field className="column">
     <label>Priority</label>
     <Input placeholder="Task Priority..." onChange={this.handleChange('priority')} value={this.state.priority}/>
     <ErrorMessage>{this.item.errors.priority}</ErrorMessage>
     </Field>
     </div>
     <Field>
     <label>Description</label>
     <textarea placeholder="Task Description..." onChange={this.handleChange('description')} value={this.state.description}/>
     <ErrorMessage>{this.item.errors.description}</ErrorMessage>
     </Field>
     <Field>
     <label>Due Date</label>
     <DatePicker onChange={this.handleChange('due_date')} selected={this.state.due_date}/>
     <ErrorMessage>{this.item.errors.due_date}</ErrorMessage>
     </Field>
     <button type="submit" className="ui button" tabIndex="0" onClick={this.handleSubmit}>Add Task</button>
     </Form>
     </div>
     );*/
    
  }
} );

export default TaskForm;