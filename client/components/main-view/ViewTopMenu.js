/** client/components/main-view/ViewTopMenu.js **/

import React from 'react';

const ViewTopMenu = (props) => (
  <div className="ui fixed menu">
    <div className="ui container">
      <a href="#" className="header item">
        My Todo App
      </a>
      
      <div className="right menu">
        <div className="item">
          Hello&nbsp;&nbsp;&nbsp;
          <strong>{props.username}</strong>!
        </div>
        <a className="item" onClick={props.onLogoutClick}>Logout</a>
      </div>
    </div>
  </div>
);

ViewTopMenu.propTypes = {
  username: React.PropTypes.string.isRequired,
  
  onLogoutClick: React.PropTypes.func.isRequired,
};

export default ViewTopMenu;
