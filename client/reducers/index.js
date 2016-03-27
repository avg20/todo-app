/** client/reducers/index.js **/

import { combineReducers } from 'redux';
import tasks from './tasks';
import addForm from './addForm';

const todoApp = combineReducers( {
  tasks,
  addForm
} );

export default todoApp;