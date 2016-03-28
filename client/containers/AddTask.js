/** client/containers/AddTask.js **/

import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/ShowTaskForm';
import { addTask } from '../actions';

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
    onAddTask: ( data ) => {
      dispatch( addTask( data ) )
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( TaskForm );