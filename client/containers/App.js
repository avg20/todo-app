/** client/containers/App.js **/

import React from 'react';
import { connect } from 'react-redux';
import ShowApp from '../components/ViewApp';
import { messagesDisplayed } from '../actions';

const mapStateToProps = ( state ) => {
  return {
    isSelected:   state.task_card.isSelected,
    item:         state.task_card.item,
    messages:     state.messages.items,
    isAuthorized: state.auth.isAuthorized
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onMessagesDisplayed: ( id ) => {
      dispatch( messagesDisplayed( id ) );
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ShowApp );