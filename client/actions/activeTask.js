/** client/actions/addTask.js **/

import { SELECT_TASK, CLOSE_TASK } from '../constants';

export const selectTask = ( item ) => {
  return {
    type: SELECT_TASK,
    item: item
  }
};

export const closeTask = () => {
  return {
    type: CLOSE_TASK
  }
};