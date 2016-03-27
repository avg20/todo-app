/** client/actions/tasks.js **/


export const fetchTasksRequest = () => {
  return {
    type: 'FETCH_TASKS_REQUEST'
  }
};

export const fetchTasksFailure = ( error ) => {
  return {
    type : 'FETCH_POSTS_FAILURE',
    error: error
  }
};

export const fetchTasksSuccess = ( tasks ) => {
  return {
    type : 'FETCH_POSTS_SUCCESS',
    tasks: tasks
  }
};


export function fetchTasks() {
  return ( dispatch ) => {
    dispatch( fetchTasksRequest() );

    return fetch( `http://localhost:3000/tasks?token=58bfb4aec2c5f5263c2d71273d2e7b70c0679b93322c7069cebc99f8f678eb59` )
      .then( ( response ) => {
        if ( !response.ok )
          return { status: 'error', error: response.statusText }

        return response.json();
      } )
      .then( ( json ) => {
        if ( json.status === 'success' )
          dispatch( fetchTasksSuccess( json ) );
        else
          dispatch( fetchTasksFailure( json.error ) );
      } );
  }
}
