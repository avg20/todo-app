/** client/containers/main-view/TopMenu.js **/

import React from 'react';
import { connect } from 'react-redux';
import ViewTopMenu from '../../components/main-view/ViewTopMenu';
import { userLogout } from '../../actions';

const mapStateToProps = ( state ) => {
  return {
    username: state.auth.username
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onLogoutClick: () => {
      dispatch( userLogout() );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ViewTopMenu );