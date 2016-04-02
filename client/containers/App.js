/** client/containers/App.js **/

import { connect } from 'react-redux';
import ViewApp from '../components/ViewApp';
import { messagesDisplayed } from '../actions';

const mapStateToProps = (state) => {
  return {
    isSelected: state.task_card.isSelected,
    item: state.task_card.item,
    messages: state.messages.items,
    isAuthorized: state.auth.isAuthorized,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMessagesDisplayed: (id) => {
      dispatch(messagesDisplayed(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewApp);
