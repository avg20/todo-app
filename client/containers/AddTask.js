import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/TaskForm';
import { addTask } from '../actions';

const mapStateToProps = ( state ) => {
  return {
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