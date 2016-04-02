/** client/components/main-view/ViewTopMenu.js **/

import React from 'react';

const ViewTopMenu = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    
    onLogoutClick: React.PropTypes.func.isRequired,
  },
  
  render: function render() {
    return (
      <div className="ui fixed menu">
        <div className="ui container">
          <a href="#" className="header item">
            My Todo App
          </a>
          
          <div className="right menu">
            <div className="item">
              Hello&nbsp;&nbsp;&nbsp;
              <strong>{this.props.username}</strong>!
            </div>
            <a className="item" onClick={this.props.onLogoutClick}>Logout</a>
          </div>
        </div>
      </div>
    );
  },
});

export default ViewTopMenu;
