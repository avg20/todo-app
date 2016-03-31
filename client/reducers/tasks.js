/** client/reducers/tasks.js **/

import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  SAVE_TASK_SUCCESS,
  SORT_TASKS,
  DELETE_TASK_SUCCESS,
  FILTER_TASKS
} from '../constants';

const getInitState = () => {
  return {
    isFetching: false,
    isFailed:   false,
    sort:       { field: 'name', val: 1 },
    filter:     '',
    items:      [],
    tree:       []
  };
};

const buildTree = ( items ) => {
  const nodes = Array.from( items );
  const map = new Map, roots = [];
  
  for ( let i = 0; i < nodes.length; i++ ) {
    const node = nodes[ i ];
    node.children = [];
    map[ node._id ] = i;
    
    if ( node.parent_id !== -1 ) {
      nodes[ map[ node.parent_id ] ].children.push( node );
    } else {
      roots.push( node );
    }
  }
  
  return roots;
};

const tasks = ( state = getInitState(), action ) => {
  let items;

  switch ( action.type ) {
    case FETCH_TASKS_REQUEST:
      return Object.assign( {}, state, { isFetching: true } );

    case FETCH_TASKS_FAILURE:
      return Object.assign( {}, state, {
        isFetching: false,
        isFailed:   true
      } );

    case FETCH_TASKS_SUCCESS:
      return Object.assign( {}, state, {
        isFetching: false,
        isFailed:   false,
        items:      action.tasks.tasks,
        tree:       buildTree( action.tasks.tasks )
      } );

    case ADD_TASK_SUCCESS:
      return Object.assign( {}, state, {
        items: [ ...state.items, action.task ],
        tree:  buildTree( [ ...state.items, action.task ] )
      } );

    case SAVE_TASK_SUCCESS:
      items = state.items.map( ( value ) => {
        if ( value._id === action.task._id )
          return action.task;
        else
          return value;
      } );

      return Object.assign( {}, state, {
        items: items,
        tree:  buildTree( items )
      } );

    case DELETE_TASK_SUCCESS:
      items = state.items.filter( ( item ) => {
        if ( action.id !== item._id )
          return item;
      } );
      
      return Object.assign( {}, state, {
        items: items,
        tree:  buildTree( items )
      } );

    case SORT_TASKS:
      return Object.assign( {}, state, {
        sort: { field: action.field, val: action.val }
      } );
  
    case FILTER_TASKS:
      return Object.assign( {}, state, {
        filter: action.val
      } );
  
    default:
      return state
  }
};

export default tasks;