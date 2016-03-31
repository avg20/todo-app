/** client/containers/auth/Auth.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowAuth from '../../components/auth/ShowAuth';

const mapStateToProps = ( state ) => {
  return {
    page: state.auth.page
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowAuth );