/** client/containers/ShowTasks.js **/

import React from 'react';
import { connect } from 'react-redux';
import Task from '../components/ShowTask';
import { fetchTasks } from '../actions';
import { selectTask } from '../actions/task/TaskActive';

const ShowTasks = ( { tasks, isFetching, isFailed, activeItem, onTasksReload, onTaskClick } ) => {
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
  
  return (
    <div className="ui pointing raised segments tasks">
      {
        tasks.map( ( task ) => <Task onClick={onTaskClick} activeItem={activeItem} key={task._id} {...task}/> )
      }
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
};

const mapStateToProps = ( state ) => {
  return {
    tasks:      state.tasks.items,
    isFetching: state.tasks.isFetching,
    isFailed:   state.tasks.isFailed,
    activeItem: state.activeTask.item
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onTasksReload: () => {
      dispatch( fetchTasks() )
    },
    onTaskClick:   ( item ) => {
      dispatch( selectTask( item ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTasks );