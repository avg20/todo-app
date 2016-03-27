/** client/components/Task.js **/

import React from 'react';
import {Input, Form, Field, Text} from 'react-semantify';
import DatePicker from 'react-datepicker';
import Select from '../helpers/SelectControl';
import moment from 'moment';

const Task = React.createClass( {
  render: function () {
    return (
      <div className="ui segment task">
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