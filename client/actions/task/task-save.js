/** client/actions/task/task-save.js **/

import { SAVE_TASK_REQUEST, SAVE_TASK_FAILURE, SAVE_TASK_SUCCESS } from '../../constants';

export const saveTaskRequest = () => {
  return {
    type: SAVE_TASK_REQUEST
  }
};

export const saveTaskFailure = ( errors ) => {
  return {
    type:   SAVE_TASK_FAILURE,
    errors: errors
  }
};

export const saveTaskSuccess = ( task, toggled ) => {
  return {
    type:    SAVE_TASK_SUCCESS,
    task:    task,
    toggled: toggled
  }
};

export function saveTask( data, toggled = false ) {
  return ( dispatch, getState ) => {
    dispatch( saveTaskRequest() );
    const { auth } = getState();
    
    return fetch( `http://localhost:3000/tasks/${data._id}?token=${auth.access_token}`, {
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
          dispatch( saveTaskSuccess( json.task, toggled ) );
        } else
          dispatch( saveTaskFailure( json.errors ) );
      } );
  }
}
