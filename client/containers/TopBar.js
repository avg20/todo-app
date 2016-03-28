/** client/containers/TopBar.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowTopBar from '../components/ShowTopBar';
import { addBlankTask } from '../actions';

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onClickCreateNew: () => {
      dispatch( addBlankTask() );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTopBar );