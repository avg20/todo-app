/** client/reducers/messages.js **/

import * as types from '../constants';

const getInitState = {
  items: []
};

const messages = ( state = getInitState, action ) => {
  switch ( action.type ) {
    case types.FETCH_MESSAGES_SUCCESS:
      return Object.assign( {}, state, {
        items: action.messages
      } );
  
    case types.ADD_USER_SUCCESS:
      return Object.assign( {}, state, {
        items: [ { message: "New Account added! Login Now!", _id: -1, type: 'success' } ]
      } );
  
    case types.MESSAGES_DISPLAYED:
      return Object.assign( {}, state, {
        items: []
      } );
    
    default:
      return state;
  }
};

export default messages;