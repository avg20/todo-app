/** client/helpers/Notify.js **/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NotifyItem from './NotifyItem';

const Notify = React.createClass({
  getInitialState: function getInitialState() {
    return { keys: [] };
  },
  
  key: 0,
  
  success: function success(msg, time) {
    this.addNotify(msg, time, 'positive');
  },
  
  error: function error(msg, time) {
    this.addNotify(msg, time, 'red');
  },
  
  info: function info(msg, time) {
    this.addNotify(msg, time, 'blue');
  },
  
  addNotify: function addNotify(msg, time, theme) {
    const key = this.key++;
    const state = this.state;
    
    state.keys[key] = { key, msg, time, theme };
    
    this.setState(state);
    
    if (time > 0) {
      this.countToHide(time, key);
    }
  },
  
  countToHide: function countToHide(duration, key) {
    setTimeout(() => {
      this.hideNotification(key);
    }, duration);
  },
  
  hideNotification: function hideNotification(key) {
    const state = this.state;
    state.keys = state.keys.filter((value) => value.key !== key);
    
    this.setState(state);
  },
  
  render: function render() {
    const count = this.state.keys.length;
    const items = this.state.keys.map((value) => (
        <NotifyItem
          id={value.key}
          key={value.key}
          hideNotification={this.hideNotification} {...value}
        />
      )
    );
    
    return (
      <div className={`notify ${count === 0 ? 'notify-hidden' : ''}`}>
        <ReactCSSTransitionGroup
          transitionName="notify-items"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  },
});

export default Notify;
