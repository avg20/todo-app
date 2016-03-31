/** client/components/ShowLoginForm.js **/

import React from 'react';

const ShowLoginForm = React.createClass( {
  render: function () {
    return (
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"/>
                <input type="text" placeholder="Username"/>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"/>
                <input type="password" placeholder="Password"/>
              </div>
            </div>
            <div className="ui fluid large teal submit button">Login</div>
          </div>
          
          <div className="ui error message"></div>
        
        </form>
        
        <div className="ui message">
          New to us? <a onClick={this.props.onPageToggle}>Sign Up</a>
        </div>
      </div>
    );
  }
} );

export default ShowLoginForm;