/** client/reducers/addTask.js **/

import { ADD_TASK_REQUEST, ADD_TASK_FAILURE, ADD_TASK_SUCCESS, SAVE_TASK_REQUEST, SAVE_TASK_FAILURE, SAVE_TASK_SUCCESS } from '../constants';

const getInitState = () => {
  return {
    isSending: false,
    isFailed:  false,
    errors:    []
  };
};

const tasks = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case SAVE_TASK_REQUEST:
    case ADD_TASK_REQUEST:
      return Object.assign( {}, state, {
        isSending: true,
        errors:    []
      } );
  
    case SAVE_TASK_FAILURE:
    case ADD_TASK_FAILURE:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  true,
        errors:    action.errors
      } );
  
    case SAVE_TASK_SUCCESS:
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