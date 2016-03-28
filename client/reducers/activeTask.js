/** client/reducers/activeTask.js **/

import { SELECT_TASK, CLOSE_TASK, ADD_BLANK_TASK } from '../constants';

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
          priority:    ''
        }
      } );
    
    default:
      return state
  }
};

export default activeTask;