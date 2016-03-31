/** client/actions/task/sortTask.js **/

import { FILTER_TASKS } from '../../constants';
import { fetchTasks } from '../TasksFetch';

export const setFilter = ( type, val ) => {
  return {
    type:       FILTER_TASKS,
    filterType: type,
    val:        val
  }
};

export function filterTasks( type, val ) {
  return ( dispatch ) => {
    dispatch( setFilter( type, val ) );
    //dispatch( fetchTasks() );
  }
}
