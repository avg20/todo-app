/** client/components/auth/ShowLoginForm.js **/

import React from 'react';
import ErrorMessage from '../../helpers/ErrorMessage';

const ShowLoginForm = React.createClass( {
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
            Log-in to your account
          </div>
        </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"/>
                <input onChange={this.handleUsernameChange} type="text" placeholder="Username" value={this.state.username}/>
              </div>
              <ErrorMessage text={this.props.errors['username']}/>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"/>
                <input onChange={this.handlePasswordChange} type="password" placeholder="Password" value={this.state.password}/>
              </div>
              <ErrorMessage text={this.props.errors['password']}/>
            </div>
            <button className="ui fluid large teal submit button" onClick={this.handleSubmit}>Create</button>
          </div>
        </form>
  
        <div className="ui message">
          New to us? <a onClick={this.props.onPageToggle}>Sign Up</a>
        </div>
      </div>
    );
  }
} );

export default ShowLoginForm;