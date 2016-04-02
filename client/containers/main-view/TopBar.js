/** client/containers/main-view/TopBar.js **/

import React from 'react';
import { connect } from 'react-redux';
import ViewTopBar from '../../components/main-view/ViewTopBar';
import { addBlankTask, sortTasks, filterTasks } from '../../actions';

const mapStateToProps = ( state ) => {
  return {
    filter: state.tasks.filter,
    sort:   state.tasks.sort
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onClickCreateNew: () => {
      dispatch( addBlankTask() );
    },
    onSortClick:      ( field, val ) => {
      return () => {
        dispatch( sortTasks( field, val ) );
      };
    },
    onFilterName:     ( val ) => {
      dispatch( filterTasks( "name", val ) );
    },
    onFilterStatus:   ( val ) => {
      dispatch( filterTasks( "status", val ) );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ViewTopBar );