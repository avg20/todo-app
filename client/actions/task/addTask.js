/** client/actions/task/addTask.js **/

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
  return ( dispatch ) => {
    dispatch( addTaskRequest() );

    return fetch( `http://localhost:3000/tasks?token=58bfb4aec2c5f5263c2d71273d2e7b70c0679b93322c7069cebc99f8f678eb59`, {
      method: 'post',
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
          dispatch( addTaskSuccess( json.task ) );
        } else
          dispatch( addTaskFailure( json.errors ) );
      } );
  }
}
