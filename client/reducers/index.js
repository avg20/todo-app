/** client/reducers/index.js **/

import { combineReducers } from 'redux';
import tasks from './tasks';
import addForm from './addForm';
import activeTask from './activeTask';
import messages from './messages';
import auth from './auth';

const todoApp = combineReducers( {
  messages,
  tasks,
  addForm,
  activeTask,
  auth
} );

export default todoApp;