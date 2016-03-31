/** client/containers/TopMenu.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowTopMenu from '../components/ShowTopMenu';

const mapStateToProps = ( state ) => {
  return {
    username: state.auth.username
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTopMenu );