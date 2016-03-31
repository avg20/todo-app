/** client/containers/main-view/TopMenu.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowTopMenu from '../../components/ShowTopMenu';
import { userLogout } from '../../actions';

const mapStateToProps = ( state ) => {
  return {
    username: state.auth.username
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onLogoutClick: () => {
      dispatch( userLogout() );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowTopMenu );