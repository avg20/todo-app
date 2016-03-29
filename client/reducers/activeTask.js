/** client/reducers/activeTask.js **/

import { SELECT_TASK, CLOSE_TASK, ADD_BLANK_TASK, DELETE_TASK_SUCCESS, SAVE_TASK_SUCCESS } from '../constants';

const getInitState = () => {
  return {
    isSelected: false,
    item:       {}
  };
};

const activeTask = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case SELECT_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       action.item
      } );

    case DELETE_TASK_SUCCESS:
    case CLOSE_TASK:
      return Object.assign( {}, state, {
        isSelected: false,
        item:       {}
      } );
  
    case ADD_BLANK_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       {
          name:        '',
          description: '',
          priority:    1
        }
      } );
  
    case SAVE_TASK_SUCCESS:
      return Object.assign( {}, state, {
        item: action.task
      } );
    
    default:
      return state
  }
};

export default activeTask;