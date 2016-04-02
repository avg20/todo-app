/** client/actions/task/task-active.js **/

import { SELECT_TASK, CLOSE_TASK, ADD_BLANK_TASK, ADD_CHILD_TASK } from '../../constants';

export const selectTask = ( item ) => {
  return {
    type: SELECT_TASK,
    item: item
  };
};

export const closeTask = () => {
  return {
    type: CLOSE_TASK
  };
};

export const addBlankTask = () => {
  return {
    type: ADD_BLANK_TASK
  };
};

export const addChildTask = ( parent ) => {
  return {
    type:   ADD_CHILD_TASK,
    parent: parent
  };
};