/** client/reducers/tasks.js **/

import * as types from '../constants';

const getInitState = {
  isFetching: false,
  isFailed: false,
  sort: { field: 'name', val: 1 },
  filter: { type: 'name', val: '' },
  items: [],
  tree: [],
};

const buildTree = (items) => {
  const nodes = Array.from(items, (v) => Object.assign({}, v));
  const map = new Map;
  const roots = [];
  
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.children = [];
    map[node._id] = i;
    
    if (node.parent_id !== -1) {
      nodes[map[node.parent_id]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  
  return roots;
};

const tasks = (state = getInitState, action) => {
  let items;
  
  switch (action.type) {
    case types.FETCH_TASKS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    
    case types.FETCH_TASKS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFailed: true,
      });
    
    case types.FETCH_TASKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFailed: false,
        items: action.tasks,
        tree: buildTree(action.tasks),
      });
    
    case types.ADD_TASK_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, action.task],
        tree: buildTree([...state.items, action.task]),
      });
    
    case types.SAVE_TASK_SUCCESS:
      items = state.items.map((value) => {
        if (value._id === action.task._id) {
          return action.task;
        }
    
        return value;
      });
  
      return Object.assign({}, state, {
        items,
        tree: buildTree(items),
      });
    
    case types.DELETE_TASK_SUCCESS:
      items = state.items.filter((item) => {
        if (action.id !== item._id) {
          return item;
        }
    
        return null;
      });
  
      return Object.assign({}, state, {
        items,
        tree: buildTree(items),
      });
    
    case types.SORT_TASKS:
      return Object.assign({}, state, {
        sort: { field: action.field, val: action.val },
      });
    
    case types.FILTER_TASKS:
      return Object.assign({}, state, {
        filter: { type: action.filterType, val: action.val },
      });
    
    default:
      return state;
  }
};

export default tasks;
