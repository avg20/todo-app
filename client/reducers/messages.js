/** client/reducers/tasks.js **/

import { FETCH_MESSAGES_SUCCESS, MESSAGES_DISPLAYED, ADD_USER_SUCCESS } from '../constants';

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
  
    case ADD_USER_SUCCESS:
      return Object.assign( {}, state, {
        items: [ { message: "New Account added! Login Now!", _id: -1, type: 'success' } ]
      } );
  
    case MESSAGES_DISPLAYED:
      return Object.assign( {}, state, {
        items: []
      } );
    
    default:
      return state
  }
};

export default tasks;