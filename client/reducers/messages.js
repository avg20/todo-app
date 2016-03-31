/** client/reducers/tasks.js **/

import { FETCH_MESSAGES_SUCCESS, MESSAGE_DISPLAYED } from '../constants';

const getInitState = () => {
  return {
    items: []
  };
};

const tasks = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case FETCH_MESSAGES_SUCCESS:
      return Object.assign( {}, state, {
        items: action.messages
      } );
    
    case MESSAGE_DISPLAYED:
      return Object.assign( {}, state, {
        items: state.items.filter( ( value ) => value._id !== action.id )
      } );
    
    default:
      return state
  }
};

export default tasks;