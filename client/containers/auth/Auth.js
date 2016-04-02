/** client/containers/auth/Auth.js **/

import React from 'react';
import { connect } from 'react-redux';
import ViewAuth from '../../components/auth/ViewAuth';

const mapStateToProps = ( state ) => {
  return {
    page: state.auth.page
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ViewAuth );