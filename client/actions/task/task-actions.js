/** client/actions/task/task-actions.js **/

import { FILTER_TASKS, SORT_TASKS } from '../../constants';

export const filterTasks = ( type, val ) => {
  return {
    type:       FILTER_TASKS,
    filterType: type,
    val:        val
  }
};

export const sortTasks = ( field, val ) => {
  return {
    type:  SORT_TASKS,
    field: field,
    val:   val
  }
};