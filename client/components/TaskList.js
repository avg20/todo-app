/** client/components/TaskList.js **/

import React from 'react';
import {Input, Form, Field, Text} from 'react-semantify';
import DatePicker from 'react-datepicker';
import Select from '../helpers/SelectControl';
import moment from 'moment';

const TaskList = React.createClass( {
  render: function () {
    return (
      <div className="ui divided items">
        <div className="item">
          <div className="ui mini image">
            <button className="ui icon button">
              <i className="checkmark icon"/>
            </button>
          </div>
          <div className="middle aligned content">
            <strong>Content A</strong>
            <div className="ui label right floated"><i className="calendar icon"/> 2016/03/28</div>
          </div>
        </div>
        <div className="item">
          <div className="ui mini image">
            <button className="ui icon button">
              <i className="checkmark icon"/>
            </button>
          </div>
          <div className="middle aligned content">
            <strong>Content B</strong>
          </div>
        </div>
        <div className="item">
          <div className="ui mini image">
            <button className="ui icon button">
              <i className="checkmark icon"/>
            </button>
          </div>
          <div className="middle aligned content">
            <strong>Content C</strong>
          </div>
        </div>
      </div>
    );
  }
} );

export default TaskList;