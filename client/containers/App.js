/** client/containers/App.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowApp from '../components/ShowApp';

const mapStateToProps = ( state ) => {
  return {
    isSelected: state.activeTask.isSelected,
    item:       state.activeTask.item
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowApp );