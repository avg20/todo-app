/** client/actions/auth/auth-signup.js **/

import * as types from '../../constants';

export const addUserRequest = () => {
  return {
    type: types.ADD_USER_REQUEST,
  };
};

export const addUserFailure = (errors) => {
  return {
    type: types.ADD_USER_FAILURE,
    errors,
  };
};

export const addUserSuccess = () => {
  return {
    type: types.ADD_USER_SUCCESS,
  };
};

export const authAddUser = (data) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch(addUserRequest());
    
    return fetch(`${auth.host}/users`, {
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
          dispatch(addUserSuccess());
        } else {
          dispatch(addUserFailure(json.errors));
        }
      });
  };
};
