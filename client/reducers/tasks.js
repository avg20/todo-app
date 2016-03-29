/** client/reducers/tasks.js **/

import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  SAVE_TASK_SUCCESS,
  SORT_TASKS,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS
} from '../constants';

const getInitState = () => {
  return {
    isFetching: false,
    isFailed:   false,
    sort:       'name',
    filter:     '',
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

    case SAVE_TASK_SUCCESS:
      return Object.assign( {}, state, {
        items: state.items.map( ( value ) => {
          if ( value._id === action.task._id )
            return action.task;
          else
            return value;
        } )
      } );
  
    case DELETE_TASK_SUCCESS:
      return Object.assign( {}, state, {
        items: state.items.filter( ( item ) => {
          if ( action.id !== item._id )
            return item;
        } )
      } );

    case SORT_TASKS:
      return Object.assign( {}, state, {
        sort: (action.val == -1 ? "-" : "") + action.field
      } );
  
    case FILTER_TASKS:
      return Object.assign( {}, state, {
        filter: action.val
      } );
    
    default:
      return state
  }
};

export default tasks;