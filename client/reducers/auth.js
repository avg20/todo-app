/** client/reducers/auth.js **/

import { AUTH_PAGE_TOGGLE, ADD_USER_REQUEST, ADD_USER_FAILURE, ADD_USER_SUCCESS } from '../constants';

const getInitState = () => {
  return {
    isAuthorized: false,
    isSending:    false,
    page:         'signup',
    errors:       {},
    user:         null,
    access_token: ''
  };
};

const auth = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case ADD_USER_REQUEST:
      return Object.assign( {}, state, {
        isSending: true
      } );
  
    case ADD_USER_FAILURE:
      return Object.assign( {}, state, {
        isSending: false,
        errors:    action.errors
      } );
  
    case ADD_USER_SUCCESS:
      return Object.assign( {}, state, {
        isSending: false,
        user:      action.user,
        page:      'login',
      } );

    case AUTH_PAGE_TOGGLE:
      return Object.assign( {}, state, {
        page: (state.page == 'login') ? 'signup' : 'login'
      } );
    
    default:
      return state
  }
};

export default auth;