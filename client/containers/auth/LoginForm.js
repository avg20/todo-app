/** client/containers/auth/LoginForm.js **/

import React from 'react';
import { connect } from 'react-redux';
import { authPageToggle, authLoginUser } from '../../actions';
import ShowLoginForm from '../../components/auth/ShowLoginForm';

const mapStateToProps = ( state ) => {
  return {
    errors:    state.auth.errors,
    isSending: state.auth.isSending
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onPageToggle: ()=> {
      dispatch( authPageToggle() );
    },
    onFormSubmit: ( data ) => {
      dispatch( authLoginUser( data ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowLoginForm );