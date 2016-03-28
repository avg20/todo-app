/** client/containers/AddTask.js **/

import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/ShowTaskForm';
import { addTask, saveTask, closeTask } from '../actions';

const mapStateToProps = ( state ) => {
  return {
    item:      state.activeTask.item || {},
    errors:    state.addForm.errors,
    isSending: state.addForm.isSending,
    isFailed:  state.addForm.isFailed
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onCloseTask: () => {
      dispatch( closeTask() );
    },
    onAddTask:   ( data ) => {
      if ( data._id )
        dispatch( saveTask( data ) );
      else
        dispatch( addTask( data ) )
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( TaskForm );