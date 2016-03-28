/** client/reducers/activeTask.js **/

import { SELECT_TASK } from '../constants';

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
    
    default:
      return state
  }
};

export default activeTask;