/** client/reducers/index.js **/

import { combineReducers } from 'redux';
import tasks from './tasks';
import messages from './messages';
import auth from './auth';
import task_card from './task-card'; // eslint-disable-line

const todoApp = combineReducers({
  messages,
  tasks,
  task_card,
  auth,
});

export default todoApp;
