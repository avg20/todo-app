/** client/components/Task.js **/

import React from 'react';
import moment from 'moment';

const Task = React.createClass( {
  getPriorityIconClass: function () {
    switch ( this.props.priority ) {
      case 1:
        return 'task__priority task__priority--low';
      
      case 2:
        return 'task__priority task__priority--medium';
      
      case 3:
        return 'task__priority task__priority--high';
      
      default:
        return 'task__priority';
    }
  },
  
  getTaskClass: function () {
    
    if ( this.props._id == this.props.activeItem._id )
      return "ui segment task task--selected";
    
    return "ui segment task";
  },

  getStatusButton: function () {
    switch ( this.props.status ) {
      case 2:
        return (
          <button onClick={this.handleButtonClick} className="circular mini ui icon green basic button">
            <i className="checkmark icon"/>
          </button>
        );
      
      case 3:
        return (
          <button onClick={this.handleButtonClick} className="circular mini ui icon red basic button">
            <i className="icon"/>
          </button>
        );
      
      default:
        return (
          <button onClick={this.handleButtonClick} className="circular mini ui icon basic button">
            <i className="icon"/>
          </button>
        );
    }
  },
  
  handleButtonClick: function ( e ) {
    e.preventDefault();
    
  },
  
  handleTaskClick: function () {
    this.props.onClick( this.props );
  },
  
  render: function () {
    return (
      <div className={this.getTaskClass()}>
        <div className="task__checkbox">
          {this.getStatusButton()}
        </div>
        <div className="task__name" onClick={this.handleTaskClick}>
          <strong>{this.props.name}</strong>
        </div>
        <div className="task__due-date">
          <div className="ui label"><i className="calendar icon"/> Due to {moment( this.props.due_date ).format( "MM/DD/YYYY" )}</div>
        </div>
        <div className={this.getPriorityIconClass()}>
          <i className="star icon"/>
        </div>
      </div>
    );
    // <i className="checkmark icon"/>
  }
} );

export default Task;