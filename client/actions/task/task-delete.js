/** client/actions/task/task-delete.js **/

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

export const deleteTaskSuccess = ( id ) => {
  return {
    type: DELETE_TASK_SUCCESS,
    id:   id
  }
};

export function deleteTask( id ) {
  return ( dispatch, getState ) => {
    dispatch( deleteTaskRequest() );
    const { auth } = getState();
    
    return fetch( `http://localhost:3000/tasks/${id}?token=${auth.access_token}`, {
      method: 'DELETE'
    } )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText };
        
        return response.json();
      } )
      .then( ( json ) => {
        if ( json.status === 'success' )
          dispatch( deleteTaskSuccess( id ) );
        else
          dispatch( deleteTaskFailure( json.error ) );
      } );
  }
}
