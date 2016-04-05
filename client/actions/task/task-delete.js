/** client/actions/task/task-delete.js **/

import * as types from '../../constants';

export const deleteTaskRequest = () => {
  return {
    type: types.DELETE_TASK_REQUEST,
  };
};

export const deleteTaskFailure = (error) => {
  return {
    type: types.DELETE_TASK_FAILURE,
    error,
  };
};

export const deleteTaskSuccess = (id) => {
  return {
    type: types.DELETE_TASK_SUCCESS,
    id,
  };
};

export function deleteTask(id) {
  return (dispatch, getState) => {
    dispatch(deleteTaskRequest());
    const { auth } = getState();
    
    return fetch(`${auth.host}/tasks/${id}?token=${auth.access_token}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          return { status: 'error', error: response.statusText };
        }
        
        return response.json();
      })
      .then((json) => {
        if (json.status === 'success') {
          dispatch(deleteTaskSuccess(id));
        } else {
          dispatch(deleteTaskFailure(json.error));
        }
      });
  };
}
