/** client/reducers/index.js **/

import { combineReducers } from 'redux';
import tasks from './tasks';
import addForm from './addForm';
import activeTask from './activeTask';

const todoApp = combineReducers( {
  tasks,
  addForm,
  activeTask
} );

export default todoApp;