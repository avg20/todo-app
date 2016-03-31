/** client/containers/App.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowApp from '../components/ShowApp';
import { messageDisplayed } from '../actions';

const mapStateToProps = ( state ) => {
  return {
    isSelected:   state.activeTask.isSelected,
    item:         state.activeTask.item,
    messages:     state.messages.items,
    isAuthorized: state.auth.isAuthorized
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onMessageDisplayed: ( id ) => {
      dispatch( messageDisplayed( id ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowApp );