/** client/actions/task/sortTask.js **/

import { FILTER_TASKS } from '../../constants';
import { fetchTasks } from '../TasksFetch';

export const setFilter = ( val ) => {
  return {
    type: FILTER_TASKS,
    val:  val
  }
};

export function filterTasks( val ) {
  return ( dispatch ) => {
    dispatch( setFilter( val ) );
    //dispatch( fetchTasks() );
  }
}
