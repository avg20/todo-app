/** client/reducers/auth.js **/

import {
  AUTH_PAGE_TOGGLE,
  ADD_USER_REQUEST,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS
} from '../constants';

const getInitState = () => {
  return {
    isAuthorized: false,
    isSending:    false,
    page:         'login',
    errors:       {},
    user:         null,
    access_token: ''
  };
};

const auth = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case LOGIN_USER_REQUEST:
    case ADD_USER_REQUEST:
      return Object.assign( {}, state, {
        isSending: true
      } );
  
    case LOGIN_USER_FAILURE:
    case ADD_USER_FAILURE:
      return Object.assign( {}, state, {
        isSending: false,
        errors:    action.errors
      } );

    case ADD_USER_SUCCESS:
      return Object.assign( {}, state, {
        isSending: false,
        user:      action.user,
        page:      'login'
      } );
  
    case LOGIN_USER_SUCCESS:
      return Object.assign( {}, state, {
        isAuthorized: true,
        access_token: action.token
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