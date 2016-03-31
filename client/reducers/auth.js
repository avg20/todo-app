/** client/reducers/auth.js **/

import { AUTH_PAGE_TOGGLE } from '../constants';

const getInitState = () => {
  return {
    isAuthorized: false,
    page:         'login',
    user:         null,
    access_token: ''
  };
};

const auth = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case AUTH_PAGE_TOGGLE:
      return Object.assign( {}, state, {
        page: (state.page == 'login') ? 'signup' : 'login'
      } );
    
    default:
      return state
  }
};

export default auth;