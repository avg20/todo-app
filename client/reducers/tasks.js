/** client/reducers/tasks.js **/

import { FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS, ADD_TASK_SUCCESS } from '../constants';

const getInitState = () => {
  return {
    isFetching: false,
    isFailed:   false,
    items:      []
  };
};

const tasks = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case FETCH_TASKS_REQUEST:
      return Object.assign( {}, state, { isFetching: true } );
  
    case FETCH_TASKS_FAILURE:
      return Object.assign( {}, state, {
        isFetching: false,
        isFailed:   true
      } );
  
    case FETCH_TASKS_SUCCESS:
      return Object.assign( {}, state, {
        isFetching: false,
        isFailed:   false,
        items:      action.tasks.tasks
      } );

    case ADD_TASK_SUCCESS:
      return Object.assign( {}, state, {
        items: [ ...state.items, action.task ]
      } );

    default:
      return state
  }
};

export default tasks;