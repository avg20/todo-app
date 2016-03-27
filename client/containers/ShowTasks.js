import React from 'react';
import { connect } from 'react-redux';
import Task from '../components/Task';
import { fetchTasks } from '../actions';

const ShowTasks = ( {tasks, isFetching, isFailed, onTasksReload} ) => {
  if ( isFetching )
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <br /><br /><br />
      </div>
    );

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
    <div className="ui raised segments">
      {
        tasks.map( ( task ) => <Task key={task._id} {...task}/> )
      }
    </div>
  );
};

const mapStateToProps = ( state ) => {
  return {
    tasks:      state.tasks.items,
    isFetching: state.tasks.isFetching,
    isFailed:   state.tasks.isFailed
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onTasksReload: () => {
      dispatch( fetchTasks() )
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTasks );