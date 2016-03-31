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
  return ( dispatch ) => {
    dispatch( fetchMessagesRequest() );
    
    return fetch( `http://localhost:3000/messages?token=58bfb4aec2c5f5263c2d71273d2e7b70c0679b93322c7069cebc99f8f678eb59` )
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
