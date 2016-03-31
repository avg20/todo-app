/** client/actions/task/saveTask.js **/

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
  return ( dispatch ) => {
    dispatch( saveTaskRequest() );
    
    return fetch( `http://localhost:3000/tasks/${data._id}?token=58bfb4aec2c5f5263c2d71273d2e7b70c0679b93322c7069cebc99f8f678eb59`, {
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
