/** client/actions/task/sortTask.js **/

import { SORT_TASKS } from '../../constants';
import { fetchTasks } from '../fetchTasks';

export const setSort = ( field, val ) => {
  return {
    type:  SORT_TASKS,
    field: field,
    val:   val
  }
};

export function sortTasks( field, val ) {
  return ( dispatch ) => {
    dispatch( setSort( field, val ) );
    dispatch( fetchTasks() );
  }
}
