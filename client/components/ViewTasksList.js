/** client/components/Task.js **/

import React from 'react';
import Task from './ViewTask';

const ShowTaskTask = React.createClass( {
  propTypes: {
    isFetching: React.PropTypes.bool.isRequired,
    isFailed:   React.PropTypes.bool.isRequired,
    activeItem: React.PropTypes.object.isRequired,
    tasks:      React.PropTypes.array.isRequired,
    
    onTasksReload:      React.PropTypes.func.isRequired,
    onTaskClick:        React.PropTypes.func.isRequired,
    onAddTaskClick:     React.PropTypes.func.isRequired,
    onTaskStatusToggle: React.PropTypes.func.isRequired
  },

  render: function () {
    const { tasks, isFetching, isFailed, activeItem, onTasksReload, onTaskClick, onAddTaskClick, onTaskStatusToggle } = this.props;
    
    if ( isFailed )
      return (
        <div className="ui center aligned segment">
          <div onClick={onTasksReload} className="ui grey basic button">Try to reload...</div>
        </div>
      );
    
    if ( tasks.length == 0 )
      return (
        <div className="ui center aligned segment">
          <strong>No Tasks found</strong>
        </div>
      );
    
    const tasksCode = tasks.map( ( task ) =>
      <Task className="tasks__task-box"
            onAddClick={onAddTaskClick}
            onStatusClick={onTaskStatusToggle}
            onClick={onTaskClick}
            activeItem={activeItem}
            key={task._id} {...task}/> );
    
    return (
      <div className="ui tasks">
        {tasksCode}
        {
          isFetching && (
            <div>
              <p/>
              <div className="ui active inverted dimmer">
                <div className="ui loader"></div>
              </div>
            </div>)
        }
      </div>
    );
  }
} );

export default ShowTaskTask;