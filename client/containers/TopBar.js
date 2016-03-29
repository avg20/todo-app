/** client/containers/TopBar.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowTopBar from '../components/ShowTopBar';
import { addBlankTask, sortTasks } from '../actions';

const mapStateToProps = () => {
  return {}
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
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTopBar );