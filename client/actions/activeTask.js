/** client/actions/addTask.js **/

import { SELECT_TASK } from '../constants';

export const selectTask = ( id ) => {
  return {
    type: SELECT_TASK,
    id:   id
  }
};