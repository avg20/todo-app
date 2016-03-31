/** client/components/auth/ShowLoginForm.js **/

import React from 'react';
import ErrorMessage from '../../helpers/ErrorMessage';

const ShowSingupForm = React.createClass( {
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
              <Error text={this.props.errors['password']}/>
            </div>
            <ErrorMessage className="ui fluid large teal submit button" onClick={this.handleSubmit}>Create</ErrorMessage>
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