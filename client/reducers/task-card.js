/** client/reducers/task-card.js **/

import { ADD_TASK_REQUEST, ADD_TASK_FAILURE, ADD_TASK_SUCCESS, SAVE_TASK_REQUEST, SAVE_TASK_FAILURE, SAVE_TASK_SUCCESS } from '../constants';
import { SELECT_TASK, CLOSE_TASK, ADD_BLANK_TASK, ADD_CHILD_TASK, DELETE_TASK_SUCCESS } from '../constants';
import moment from "moment";

const getInitState = () => {
  return {
    isSelected: false,
    isSending:  false,
    isFailed:   false,
    errors:     [],
    item:       {}
  };
};

const getBlankItem = {
  name:        '',
  description: '',
  priority:    1,
  due_date:    moment().startOf( 'day' )
};

const task_card = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case SELECT_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       action.item
      } );

    case DELETE_TASK_SUCCESS:
    case CLOSE_TASK:
      return Object.assign( {}, state, {
        isSelected: false,
        item:       {}
      } );
  
    case ADD_BLANK_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       Object.assign( {}, getBlankItem )
      } );
  
    case ADD_CHILD_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       Object.assign( {}, getBlankItem, { parent_id: action.parent._id } )
      } );

    case SAVE_TASK_REQUEST:
    case ADD_TASK_REQUEST:
      return Object.assign( {}, state, {
        isSending:  true,
        errors:     []
      } );

    case SAVE_TASK_FAILURE:
    case ADD_TASK_FAILURE:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  true,
        errors:    action.errors
      } );

    case SAVE_TASK_SUCCESS:
    case ADD_TASK_SUCCESS:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  false,
        errors:    [],
        item:      (action.toggled || action.type == ADD_TASK_SUCCESS) ? state.item : action.task
      } );
  
    default:
      return state
  }
};

export default task_card;