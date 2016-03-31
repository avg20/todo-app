/** client/containers/SignupForm.js **/

import React from 'react';
import { connect } from 'react-redux';
import { authPageToggle } from '../actions';
import ShowSignupForm from '../components/ShowSignupForm';

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
)( ShowSignupForm );