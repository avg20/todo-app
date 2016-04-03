/** client/components/ViewTasksList.js **/

import React from 'react';
import ViewTask from './ViewTask';

const ViewTasksList = (props) => {
  if (props.isFailed) {
    return (
      <div className="ui center aligned segment">
        <button
          onClick={props.onTasksReload}
          className="ui grey basic button"
        >
          Try to reload...
        </button>
      </div>
    );
  }
  
  if (props.tasks.length === 0) {
    return (
      <div className="ui center aligned segment">
        <strong>No Tasks found</strong>
      </div>
    );
  }
  
  const tasksCode = props.tasks.map((task) => (
      <ViewTask
        className="tasks__task-box"
        onAddClick={props.onAddTaskClick}
        onStatusClick={props.onTaskStatusToggle}
        onClick={props.onTaskClick}
        activeItem={props.activeItem}
        key={task._id} {...task}
      />
    )
  );
  
  return (
    <div className="ui tasks">
      {tasksCode}
      {props.isFetching && (
        <div>
          <p />
          <div className="ui active inverted dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

ViewTasksList.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  isFailed: React.PropTypes.bool.isRequired,
  activeItem: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array.isRequired,

  onTasksReload: React.PropTypes.func.isRequired,
  onTaskClick: React.PropTypes.func.isRequired,
  onAddTaskClick: React.PropTypes.func.isRequired,
  onTaskStatusToggle: React.PropTypes.func.isRequired,
};

export default ViewTasksList;
