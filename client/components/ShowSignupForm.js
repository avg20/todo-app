/** client/components/ShowLoginForm.js **/

import React from 'react';

const ShowSingupForm = React.createClass( {
  render: function () {
    return (
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Create new account
          </div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"/>
                <input type="text" name="email" placeholder="Username"/>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"/>
                <input type="password" name="password" placeholder="Password"/>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"/>
                <input type="password" name="password" placeholder="Confirm Password"/>
              </div>
            </div>
            <div className="ui fluid large teal submit button">Create</div>
          </div>
        </form>
        
        <div className="ui message">
          Have Account? <a onClick={this.props.onPageToggle}>Login</a>
        </div>
      </div>
    );
  }
} );

export default ShowSingupForm;