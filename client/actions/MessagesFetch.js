/** client/actions/fetchMessages.js **/

import { FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_SUCCESS, MESSAGE_DISPLAYED } from '../constants';
import { fetchTasks } from './';

export const fetchMessagesRequest = () => {
  return {
    type: FETCH_MESSAGES_REQUEST
  }
};

export const fetchMessagesFailure = ( error ) => {
  return {
    type:  FETCH_MESSAGES_FAILURE,
    error: error
  }
};

export const fetchMessagesSuccess = ( answer ) => {
  return {
    type:     FETCH_MESSAGES_SUCCESS,
    messages: answer.messages
  }
};

export const messageDisplayed = ( id ) => {
  return {
    type: MESSAGE_DISPLAYED,
    id:   id
  };
};

export function fetchMessages() {
  return ( dispatch, getState ) => {
    dispatch( fetchMessagesRequest() );
    const { auth } = getState();
    
    return fetch( `http://localhost:3000/messages?token=${auth.access_token}` )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText };
        
        return response.json();
      } )
      .then( ( json ) => {
        if ( json.status === 'success' ) {
          dispatch( fetchMessagesSuccess( json ) );
          if ( json.messages.length )
            dispatch( fetchTasks() );
        } else
          dispatch( fetchMessagesFailure( json.error ) );
      } );
  }
}
