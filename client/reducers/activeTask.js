/** client/reducers/activeTask.js **/

import { SELECT_TASK } from '../constants';

const getInitState = () => {
  return {
    isSelected: true,
    item:       null
  };
};

const activeTask = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case SELECT_TASK:
      return Object.assign( {}, state, {
        isSelected: !state.isSelected
      } );
    
    default:
      return state
  }
};

export default activeTask;