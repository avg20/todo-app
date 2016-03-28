/** client/actions/task/deleteTask.js **/

import { DELETE_TASK_REQUEST, DELETE_TASK_FAILURE, DELETE_TASK_SUCCESS } from '../../constants';

export const deleteTaskRequest = () => {
  return {
    type: DELETE_TASK_REQUEST
  }
};

export const deleteTaskFailure = ( error ) => {
  return {
    type:  DELETE_TASK_FAILURE,
    error: error
  }
};

export const deleteTaskSuccess = ( tasks ) => {
  return {
    type:  DELETE_TASK_SUCCESS,
    tasks: tasks
  }
};

export function deleteTask( id ) {
  return ( dispatch ) => {
    dispatch( deleteTaskRequest() );
    
    return fetch( `http://localhost:3000/tasks/${id}?token=58bfb4aec2c5f5263c2d71273d2e7b70c0679b93322c7069cebc99f8f678eb59`, {
      method: 'DELETE'
    } )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText };
        
        return response.json();
      } )
      .then( ( json ) => {
        if ( json.status === 'success' )
          dispatch( deleteTaskSuccess( json ) );
        else
          dispatch( deleteTaskFailure( json.error ) );
      } );
  }
}
