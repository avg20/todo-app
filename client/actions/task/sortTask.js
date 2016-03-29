/** client/actions/task/sortTask.js **/

import { SORT_TASKS } from '../../constants';

export const sortTasks = ( field, val ) => {
  return {
    type:  SORT_TASKS,
    field: field,
    val:   val
  }
};