/** client/actions/auth/auth-actions.js **/

import { AUTH_PAGE_TOGGLE, SETUP_CREDITIONS, USER_LOGOUT } from '../../constants';

export const setupCreditions = ( token, username ) => {
  return {
    type:     SETUP_CREDITIONS,
    token:    token,
    username: username
  }
};

export const authPageToggle = () => {
  return {
    type: AUTH_PAGE_TOGGLE
  }
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
};