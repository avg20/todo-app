/** client/reducers/tasks.js **/

import { FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS, ADD_TASK_SUCCESS, SAVE_TASK_SUCCESS, SORT_TASKS } from '../constants';

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
  
    case SAVE_TASK_SUCCESS:
      return Object.assign( {}, state, {
        items: state.items.map( ( value ) => {
          if ( value._id === action.task._id )
            return action.task;
          else
            return value;
        } )
      } );
  
    case SORT_TASKS:
      return Object.assign( {}, state, {
        items: Array.from( state.items ).sort( ( a, b ) => {
          let result = 1;
        
          if ( typeof a[ action.field ] === 'string' )
            result = a[ action.field ].localeCompare( b[ action.field ] );
        
          if ( typeof a[ action.field ] === 'number' )
            result = a[ action.field ] - b[ action.field ];
        
          return result * action.val;
        } )
      } );
    
    default:
      return state
  }
};

export default tasks;