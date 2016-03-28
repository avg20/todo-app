/** client/components/Task.js **/

import React from 'react';
import moment from 'moment';

const Task = React.createClass( {
  getTaskClass: function () {
    switch ( this.props.priority ) {
      case 1:
        return 'ui segment task task--low-priority';
      
      case 2:
        return 'ui segment task task--medium-priority';
      
      case 3:
        return 'ui segment task task--high-priority';
      
      default:
        return 'ui segment task';
    }
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
          <div className="ui label"><i className="calendar icon"/> Due to <strong>{moment( this.props.due_date ).format( "MM/DD/YYYY" )}</strong></div>
        </div>
      </div>
    );
    //
  }
} );

export default Task;