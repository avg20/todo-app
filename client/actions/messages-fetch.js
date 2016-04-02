/** client/actions/fetchMessages.js **/

import * as types from '../constants';
import { fetchTasks } from './';

export const fetchMessagesRequest = () => {
  return {
    type: types.FETCH_MESSAGES_REQUEST,
  };
};

export const fetchMessagesFailure = (error) => {
  return {
    type: types.FETCH_MESSAGES_FAILURE,
    error,
  };
};

export const fetchMessagesSuccess = (messages) => {
  return {
    type: types.FETCH_MESSAGES_SUCCESS,
    messages,
  };
};

export const messagesDisplayed = () => {
  return {
    type: types.MESSAGES_DISPLAYED,
  };
};

export function fetchMessages() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch(fetchMessagesRequest());
    
    return fetch(`http://localhost:3000/messages?token=${auth.access_token}`)
      .then((response) => {
        if (!response.ok) {
          return { status: 'error', error: response.statusText };
        }

        return response.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          dispatch(fetchMessagesSuccess(json.messages));
          
          if (json.messages.length) {
            dispatch(fetchTasks());
          }
        } else {
          dispatch(fetchMessagesFailure(json.error));
        }
      });
  };
}
