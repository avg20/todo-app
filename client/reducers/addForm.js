/** client/reducers/addTask.js **/

import { ADD_TASK_REQUEST, ADD_TASK_FAILURE, ADD_TASK_SUCCESS } from '../constants';

const getInitState = () => {
  return {
    isSending: false,
    isFailed:  false,
    errors:    []
  };
};

const tasks = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case ADD_TASK_REQUEST:
      return Object.assign( {}, state, {
        isSending: true,
        errors:    []
      } );
  
    case ADD_TASK_FAILURE:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  true,
        errors:    action.errors
      } );
  
    case ADD_TASK_SUCCESS:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  false,
        errors:    []
      } );
  
    default:
      return state
  }
};

export default tasks;