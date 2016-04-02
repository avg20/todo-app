/** client/actions/task/task-actions.js **/

import * as types from '../../constants';

export const filterTasks = (filterType, val) => {
  return {
    type: types.FILTER_TASKS,
    filterType,
    val,
  };
};

export const sortTasks = (field, val) => {
  return {
    type: types.SORT_TASKS,
    field,
    val,
  };
};
