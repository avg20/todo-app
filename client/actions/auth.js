/** client/actions/auth.js **/

import {
  AUTH_PAGE_TOGGLE,
  ADD_USER_REQUEST,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  SETUP_CREDITIONS
} from '../constants';
import { fetchTasks } from './';

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

/** SingUp **/

export const addUserRequest = () => {
  return {
    type: ADD_USER_REQUEST
  }
};

export const addUserFailure = ( errors ) => {
  return {
    type:   ADD_USER_FAILURE,
    errors: errors
  }
};

export const addUserSuccess = () => {
  return {
    type: ADD_USER_SUCCESS
  }
};

export const authAddUser = ( data ) => {
  return ( dispatch ) => {
    dispatch( addUserRequest() );
    
    return fetch( `http://localhost:3000/users`, {
      method: 'POST',
      body:   JSON.stringify( data )
    } )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText };
        
        return response.json();
      } )
      .then( ( json ) => {
        console.log( json );
        if ( json.status === 'success' ) {
          dispatch( addUserSuccess() );
        } else
          dispatch( addUserFailure( json.errors ) );
      } );
  }
};

/** Login **/

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  }
};

export const loginUserFailure = ( errors ) => {
  return {
    type:   LOGIN_USER_FAILURE,
    errors: errors
  }
};

export const loginUserSuccess = ( token, username ) => {
  return {
    type:     LOGIN_USER_SUCCESS,
    token:    token,
    username: username
  }
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
        console.log( json );
        if ( json.status === 'success' ) {
          dispatch( loginUserSuccess( json.access_token, data.username ) );
          dispatch( fetchTasks() );
        } else
          dispatch( loginUserFailure( json.errors ) );
      } );
  }
};