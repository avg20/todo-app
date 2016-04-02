/** client/reducers/task-card.js **/

import * as types from '../constants';
import moment from "moment";

const getInitState = {
  isSelected: false,
  isSending:  false,
  isFailed:   false,
  errors:     [],
  item:       {}
};

const getBlankItem = {
  name:        '',
  description: '',
  priority:    1,
  due_date:    moment().startOf( 'day' )
};

const task_card = ( state = getInitState, action ) => {
  switch ( action.type ) {
    case types.SELECT_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       action.item
      } );
  
    case types.DELETE_TASK_SUCCESS:
    case types.CLOSE_TASK:
      return Object.assign( {}, state, {
        isSelected: false,
        item:       {}
      } );
  
    case types.ADD_BLANK_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       Object.assign( {}, getBlankItem )
      } );
  
    case types.ADD_CHILD_TASK:
      return Object.assign( {}, state, {
        isSelected: true,
        item:       Object.assign( {}, getBlankItem, { parent_id: action.parent._id } )
      } );
  
    case types.SAVE_TASK_REQUEST:
    case types.ADD_TASK_REQUEST:
      return Object.assign( {}, state, {
        isSending: true,
        errors:    []
      } );
  
    case types.SAVE_TASK_FAILURE:
    case types.ADD_TASK_FAILURE:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  true,
        errors:    action.errors
      } );
  
    case types.SAVE_TASK_SUCCESS:
    case types.ADD_TASK_SUCCESS:
      return Object.assign( {}, state, {
        isSending: false,
        isFailed:  false,
        errors:    [],
        item:      (action.toggled || action.type === types.ADD_TASK_SUCCESS) ? state.item : action.task
      } );
  
    default:
      return state
  }
};

export default task_card;