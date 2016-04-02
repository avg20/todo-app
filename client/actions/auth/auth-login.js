/** client/actions/auth/auth-login.js **/

import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from '../../constants';
import { fetchTasks } from '../';

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  };
};

export const loginUserFailure = ( errors ) => {
  return {
    type:   LOGIN_USER_FAILURE,
    errors: errors
  };
};

export const loginUserSuccess = ( token, username ) => {
  return {
    type:     LOGIN_USER_SUCCESS,
    token:    token,
    username: username
  };
};

export const authLoginUser = ( data ) => {
  return ( dispatch ) => {
    dispatch( loginUserRequest() );
    
    return fetch( `http://localhost:3000/users/login`, {
      method: 'POST',
      body:   JSON.stringify( data )
    } )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText };
        
        return response.json();
      } )
      .then( ( json ) => {
        if ( json.status === 'success' ) {
          dispatch( loginUserSuccess( json.access_token, data.username ) );
          dispatch( fetchTasks() );
        } else
          dispatch( loginUserFailure( json.errors ) );
      } );
  };
};