/** client/containers/TaskCard.js **/

import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/ShowTaskForm';
import { addTask, saveTask, closeTask, deleteTask } from '../actions';

const mapStateToProps = ( state ) => {
  return {
    item:      state.task_card.item || {},
    errors:    state.task_card.errors,
    isSending: state.task_card.isSending,
    isFailed:  state.task_card.isFailed
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onCloseTask:  () => {
      dispatch( closeTask() );
    },
    onAddTask:    ( data ) => {
      if ( data._id )
        dispatch( saveTask( data ) );
      else
        dispatch( addTask( data ) )
    },
    onDeleteTask: ( data ) => {
      dispatch( deleteTask( data._id ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( TaskForm );