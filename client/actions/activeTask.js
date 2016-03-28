/** client/actions/addTask.js **/

import { SELECT_TASK } from '../constants';

export const selectTask = ( item ) => {
  return {
    type: SELECT_TASK,
    item: item
  }
};