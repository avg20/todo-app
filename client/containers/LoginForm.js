/** client/containers/LoginForm.js **/

import React from 'react';
import { connect } from 'react-redux';
import { authPageToggle } from '../actions';
import ShowLoginForm from '../components/ShowLoginForm';

const mapStateToProps = ( state ) => {
  return {}
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onPageToggle: ()=> {
      dispatch( authPageToggle() );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowLoginForm );