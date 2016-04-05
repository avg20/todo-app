/** client/actions/task/task-add.js **/

import * as types from '../../constants';

export const addTaskRequest = () => {
  return {
    type: types.ADD_TASK_REQUEST,
  };
};

export const addTaskFailure = (errors) => {
  return {
    type: types.ADD_TASK_FAILURE,
    errors,
  };
};

export const addTaskSuccess = (task) => {
  return {
    type: types.ADD_TASK_SUCCESS,
    task,
  };
};

export function addTask(data) {
  return (dispatch, getState) => {
    dispatch(addTaskRequest());
    const { auth } = getState();
    
    return fetch(`${auth.host}/tasks?token=${auth.access_token}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return { status: 'error', error: response.statusText };
        }

        return response.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          dispatch(addTaskSuccess(json.task));
        } else {
          dispatch(addTaskFailure(json.errors));
        }
      });
  };
}
