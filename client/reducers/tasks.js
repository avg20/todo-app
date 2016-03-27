/** client/reducers/tasks.js **/

const getInitState = () => {
  return {
    isFetching: false,
    isFailed:   false,
    items:      []
  };
};

const tasks = ( state = getInitState(), action ) => {
  switch ( action.type ) {
    case 'FETCH_TASKS_REQUEST':
      return Object.assign( {}, state, { isFetching: true } );

    case 'FETCH_POSTS_FAILURE':
      return Object.assign( {}, state, {
        isFetching: false,
        isFailed:   true
      } );

    case 'FETCH_POSTS_SUCCESS':
      return Object.assign( {}, state, {
        isFetching: false,
        isFailed:   false,
        items:      action.tasks.tasks
      } );

    case 'ADD_TASK_SUCCESS':
      return Object.assign( {}, state, {
        items: [ ...state.items, action.task ]
      } );

    default:
      return state
  }
};

export default tasks;