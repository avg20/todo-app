/** client/actions/task/task-add.js **/

import { ADD_TASK_REQUEST, ADD_TASK_FAILURE, ADD_TASK_SUCCESS } from '../../constants';

export const addTaskRequest = () => {
  return {
    type: ADD_TASK_REQUEST
  }
};

export const addTaskFailure = ( errors ) => {
  return {
    type:   ADD_TASK_FAILURE,
    errors: errors
  }
};

export const addTaskSuccess = ( task ) => {
  return {
    type: ADD_TASK_SUCCESS,
    task: task
  }
};

export function addTask( data ) {
  return ( dispatch, getState ) => {
    dispatch( addTaskRequest() );
    const { auth } = getState();
    
    return fetch( `http://localhost:3000/tasks?token=${auth.access_token}`, {
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
          dispatch( addTaskSuccess( json.task ) );
        } else
          dispatch( addTaskFailure( json.errors ) );
      } );
  }
}
