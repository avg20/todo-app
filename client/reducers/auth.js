/** client/reducers/auth.js **/

import * as types from '../constants';

const getInitState = {
  isAuthorized: false,
  isSending: false,
  page: 'login',
  errors: {},
  username: '',
  access_token: '',
  host: '',
};

const auth = (state = getInitState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
    case types.ADD_USER_REQUEST:
      return Object.assign({}, state, {
        isSending: true,
      });
      
    case types.SETUP_HOST:
      return Object.assign({}, state, {
        host: action.host,
      });
    
    case types.LOGIN_USER_FAILURE:
    case types.ADD_USER_FAILURE:
      return Object.assign({}, state, {
        isSending: false,
        errors: action.errors,
      });
    
    case types.ADD_USER_SUCCESS:
      return Object.assign({}, state, {
        isSending: false,
        page: 'login',
      });
    
    case types.SETUP_CREDITIONS:
    case types.LOGIN_USER_SUCCESS:
      if (typeof(Storage) !== 'undefined') {
        localStorage.setItem('access_token', action.token);
        localStorage.setItem('username', action.username);
      }
  
      return Object.assign({}, state, {
        isSending: false,
        isAuthorized: true,
        access_token: action.token,
        username: action.username,
      });
    
    case types.USER_LOGOUT:
      if (typeof(Storage) !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
      }
  
      return Object.assign({}, state, {
        isSending: false,
        isAuthorized: false,
        access_token: '',
        username: '',
        page: 'login',
      });
    
    case types.AUTH_PAGE_TOGGLE:
      return Object.assign({}, state, {
        page: (state.page === 'login') ? 'signup' : 'login',
      });
    
    default:
      return state;
  }
};

export default auth;
