/** client/containers/TopBar.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowTopBar from '../components/ShowTopBar';
import { addBlankTask, sortTasks, filterTasks } from '../actions';

const mapStateToProps = ( state ) => {
  return {
    filter: state.tasks.filter
  }
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
    onFilterType:     ( val ) => {
      dispatch( filterTasks( val ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTopBar );