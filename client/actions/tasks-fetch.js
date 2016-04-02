/** client/actions/fetchTasks.js **/

import * as types from '../constants';

export const fetchTasksRequest = () => {
  return {
    type: types.FETCH_TASKS_REQUEST,
  };
};

export const fetchTasksFailure = (error) => {
  return {
    type: types.FETCH_TASKS_FAILURE,
    error,
  };
};

export const fetchTasksSuccess = (tasks) => {
  return {
    type: types.FETCH_TASKS_SUCCESS,
    tasks,
  };
};

export function fetchTasks() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch(fetchTasksRequest());
    
    return fetch(`http://localhost:3000/tasks?token=${auth.access_token}`)
      .then((response) => {
        if (!response.ok) {
          return { status: 'error', error: response.statusText };
        }
          
        return response.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          dispatch(fetchTasksSuccess(json.tasks));
        } else {
          dispatch(fetchTasksFailure(json.error));
        }
      });
  };
}
