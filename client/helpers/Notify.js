/** client/helpers/Notify.js **/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Item = React.createClass( {
  hideNotification: function () {
    this.props.hideNotification( this.props.id );
  },
  
  render: function () {
    return (
      <div className={`notify__item ui ${this.props.theme} message`}>
        <i className="close icon" onClick={this.hideNotification}/>
        <div className="notify__item__header header">
          {this.props.msg}
        </div>
      </div>
    );
  }
} );

const Notify = React.createClass( {
  key: 0,
  
  getInitialState: function () {
    return { keys: [] };
  },
  
  success: function ( msg, time ) {
    this.addNotify( msg, time, 'positive' );
  },
  
  error: function ( msg, time ) {
    this.addNotify( msg, time, 'red' );
  },
  
  info: function ( msg, time ) {
    this.addNotify( msg, time, 'blue' );
  },
  
  addNotify: function ( msg, time, theme ) {
    const key = this.key++;
    const state = this.state;
    
    state.keys[ key ] = { key: key, msg: msg, time: time, theme: theme };
    
    this.setState( state );
    
    if ( time > 0 )
      this.countToHide( time, key );
  },
  
  countToHide: function ( duration, key ) {
    setTimeout( () => {
      this.hideNotification( key );
    }, duration );
  },
  
  hideNotification: function ( key ) {
    const state = this.state;
    state.keys = state.keys.filter( ( value ) => value.key !== key );
    
    this.setState( state );
  },
  
  render: function () {
    const count = this.state.keys.length;
    const items = this.state.keys.map( ( value ) => <Item id={value.key} key={value.key} hideNotification={this.hideNotification} {...value} /> );
    
    return (
      <div className={`notify ${count === 0 ? "notify-hidden" : ""}`}>
        <ReactCSSTransitionGroup transitionName="notify-items" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
} );

export default Notify;
