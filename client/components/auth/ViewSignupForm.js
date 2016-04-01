/** client/components/auth/ShowLoginForm.js **/

import React from 'react';
import InputField from '../../helpers/InputField';

const ShowSingupForm = React.createClass( {
  propTypes: {
    errors:    React.PropTypes.object.isRequired,
    isSending: React.PropTypes.bool.isRequired,
    
    onPageToggle: React.PropTypes.func.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired
  },
  
  getInitialState: function () {
    return {
      username: '',
      password: ''
    }
  },
  
  handleUsernameChange: function ( e ) {
    this.setState( { username: e.target.value } );
  },
  
  handlePasswordChange: function ( e ) {
    this.setState( { password: e.target.value } );
  },
  
  handleSubmit: function ( e ) {
    e.preventDefault();
    
    this.props.onFormSubmit( this.state );
  },

  render: function () {
    return (
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Create new account
          </div>
        </h2>
        <form className={`ui ${this.props.isSending ? "loading" : ""} large form`}>
          <div className="ui stacked segment">
            <InputField
              onChange={this.handleUsernameChange}
              placeholder="Username"
              icon="user"
              type="text"
              value={this.state.username}
              error={this.props.errors['username']}/>
  
            <InputField
              onChange={this.handlePasswordChange}
              placeholder="Password"
              icon="lock"
              type="password"
              value={this.state.password}
              error={this.props.errors['password']}/>
            
            <button className="ui fluid large teal submit button" onClick={this.handleSubmit}>Create</button>
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