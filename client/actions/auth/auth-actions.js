/** client/actions/auth/auth-actions.js **/

import * as types from '../../constants';

export const setupCreditions = (token, username) => {
  return {
    type: types.SETUP_CREDITIONS,
    token,
    username,
  };
};

export const setupHost = (host) => {
  return {
    type: types.SETUP_HOST,
    host,
  };
};

export const authPageToggle = () => {
  return {
    type: types.AUTH_PAGE_TOGGLE,
  };
};

export const userLogout = () => {
  return {
    type: types.USER_LOGOUT,
  };
};
