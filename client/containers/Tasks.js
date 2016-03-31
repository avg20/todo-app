/** client/containers/Tasks.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowTasksList from '../components/ViewTasksList';
import { fetchTasks, addChildTask, selectTask, taskStatusToggle } from '../actions';

const filterItem = ( item, filter ) => {
  switch ( filter.type ) {
    case 'name':
      return item.name.indexOf( filter.val ) !== -1;
    
    case 'status':
      return filter.val == 0 || item.status == filter.val;
    
    default:
      return false;
  }
};

const sortTree = ( items, sort ) => {
  for ( let item of items ) {
    if ( item.children.length )
      sortTree( item.children, sort );
  }
  
  items.sort( ( a, b ) => {
    let result = 1;
    
    if ( typeof a[ sort.field ] === 'string' )
      result = a[ sort.field ].localeCompare( b[ sort.field ] );
    
    if ( typeof a[ sort.field ] === 'number' )
      result = a[ sort.field ] - b[ sort.field ];
    
    return result * sort.val;
  } );
};

const filterTree = ( items, filter ) => {
  let array = Array.from( items, v => Object.assign( {}, v ) );
  
  for ( let item of array ) {
    if ( item.children.length )
      item.children = filterTree( item.children, filter );
  }
  
  return array.filter( ( value ) => {
    return filterItem( value, filter ) || value.children.length > 0;
  } );
};

const getTasks = ( tasks, filter, sort ) => {
  let array = Array.from( tasks, v => Object.assign( {}, v ) );
  
  sortTree( array, sort );
  
  return filterTree( array, filter );
};

const mapStateToProps = ( state ) => {
  return {
    tasks:      getTasks( state.tasks.tree, state.tasks.filter, state.tasks.sort ),
    isFetching: state.tasks.isFetching,
    isFailed:   state.tasks.isFailed,
    activeItem: state.task_card.item
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onTasksReload:      () => {
      dispatch( fetchTasks() )
    },
    onTaskClick:        ( item ) => {
      dispatch( selectTask( item ) );
    },
    onAddTaskClick:     ( parent ) => {
      dispatch( addChildTask( parent ) );
    },
    onTaskStatusToggle: ( item ) => {
      dispatch( taskStatusToggle( item ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTasksList );