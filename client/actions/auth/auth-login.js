/** client/actions/auth/auth-login.js **/

import * as types from '../../constants';
import { fetchTasks } from '../';

export const loginUserRequest = () => {
  return {
    type: types.LOGIN_USER_REQUEST,
  };
};

export const loginUserFailure = (errors) => {
  return {
    type: types.LOGIN_USER_FAILURE,
    errors,
  };
};

export const loginUserSuccess = (token, username) => {
  return {
    type: types.LOGIN_USER_SUCCESS,
    token,
    username,
  };
};

export const authLoginUser = (data) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    
    return fetch(`${location.origin}/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return { status: 'error', error: response.statusText };
        }
        
        return response.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          dispatch(loginUserSuccess(json.access_token, data.username));
          dispatch(fetchTasks());
        } else {
          dispatch(loginUserFailure(json.errors));
        }
      });
  };
};
