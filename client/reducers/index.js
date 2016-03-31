/** client/reducers/index.js **/

import { combineReducers } from 'redux';
import tasks from './tasks';
import task_card from './task-card';
import messages from './messages';
import auth from './auth';

const todoApp = combineReducers( {
  messages,
  tasks,
  task_card,
  auth
} );

export default todoApp;