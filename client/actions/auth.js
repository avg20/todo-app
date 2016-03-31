/** client/actions/auth.js **/

import { AUTH_PAGE_TOGGLE, ADD_USER_REQUEST, ADD_USER_FAILURE, ADD_USER_SUCCESS } from '../constants';

export const authPageToggle = () => {
  return {
    type: AUTH_PAGE_TOGGLE
  }
};

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
