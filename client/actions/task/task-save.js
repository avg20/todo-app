/** client/actions/task/task-save.js **/

import * as types from '../../constants';

export const saveTaskRequest = () => {
  return {
    type: types.SAVE_TASK_REQUEST,
  };
};

export const saveTaskFailure = (errors) => {
  return {
    type: types.SAVE_TASK_FAILURE,
    errors,
  };
};

export const saveTaskSuccess = (task, toggled) => {
  return {
    type: types.SAVE_TASK_SUCCESS,
    task,
    toggled,
  };
};

export function saveTask(data, toggled = false) {
  return (dispatch, getState) => {
    dispatch(saveTaskRequest());
    const { auth } = getState();
    
    return fetch(`http://localhost:3000/tasks/${data._id}?token=${auth.access_token}`, {
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
          dispatch(saveTaskSuccess(json.task, toggled));
        } else {
          dispatch(saveTaskFailure(json.errors));
        }
      });
  };
}
