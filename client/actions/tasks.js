/** client/actions/tasks.js **/

import { saveTask } from './';

export const taskStatusToggle = ( id ) => {
  return ( dispatch, getState ) => {
    const state = getState();
    
    for ( let task of state.tasks.items ) {
      if ( task._id === id ) {
        task.status = (task.status === 1) ? 2 : 1;
  
        dispatch( saveTask( task, true ) );
      }
    }
  }
};

