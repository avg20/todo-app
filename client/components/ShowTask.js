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
  
  handleClick: function () {
    this.props.onClick( this.props );
  },
  
  render: function () {
    return (
      <div className={this.getTaskClass()} onClick={this.handleClick}>
        <div className="task__checkbox">
          <button className="mini ui icon button">
            <i className="checkmark icon"/>
          </button>
        </div>
        <div className="task__name">
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
    //
  }
} );

export default Task;