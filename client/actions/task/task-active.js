/** client/actions/task/task-active.js **/

import * as types from '../../constants';

export const selectTask = (item) => {
  return {
    type: types.SELECT_TASK,
    item,
  };
};

export const closeTask = () => {
  return {
    type: types.CLOSE_TASK,
  };
};

export const addBlankTask = () => {
  return {
    type: types.ADD_BLANK_TASK,
  };
};

export const addChildTask = (parent) => {
  return {
    type: types.ADD_CHILD_TASK,
    parent,
  };
};
