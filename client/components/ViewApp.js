/** client/components/ViewApp.js **/

import React from 'react';
import TaskCard from '../containers/TaskCard';
import ShowTasks from '../containers/Tasks';
import TopBar from '../containers/main-view/TopBar';
import Notify from '../helpers/Notify';
import Auth from '../containers/auth/Auth';
import TopMenu from '../containers/main-view/TopMenu';

const ViewApp = React.createClass({
  propTypes: {
    isSelected: React.PropTypes.bool.isRequired,
    isAuthorized: React.PropTypes.bool.isRequired,
    messages: React.PropTypes.array.isRequired,
    item: React.PropTypes.object.isRequired,
  
    onMessagesDisplayed: React.PropTypes.func.isRequired,
  },
  
  componentDidMount: function componentDidMount() {
    this.showMessages();
  },
  
  componentDidUpdate: function componentDidUpdate() {
    this.showMessages();
  },
  
  showMessages: function showMessagesfunction() {
    if (this.props.messages.length) {
      this.props.messages.forEach((value) => {
        if (value.type === 'success') {
          this.refs.notify.success(value.message, 0);
        } else {
          this.refs.notify.error(value.message, 0);
        }
      });
      
      this.props.onMessagesDisplayed();
    }
  },
  
  render: function render() {
    const leftSide = this.props.isSelected;
    
    if (this.props.isAuthorized) {
      return (
        <div className="ui container main stackable divided grid">
          <TopMenu />
          <Notify ref="notify" />
          <div className="row">
            <div className={`${leftSide ? 'ten' : 'sixteen'} wide column main__column`}>
              <TopBar />
              <ShowTasks />
            </div>
            {leftSide ? <div className="six wide column main__column"><TaskCard /></div> : null}
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <Notify ref="notify" />
        <Auth />
      </div>
    );
  },
});

export default ViewApp;
