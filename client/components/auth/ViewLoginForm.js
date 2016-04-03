/** client/components/auth/ViewLoginForm.js **/

import React from 'react';
import InputField from '../../helpers/InputField';

const ViewLoginForm = React.createClass({
  propTypes: {
    errors: React.PropTypes.object.isRequired,
    isSending: React.PropTypes.bool.isRequired,
    
    onPageToggle: React.PropTypes.func.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
  },
  
  getInitialState: function getInitialState() {
    return {
      username: '',
      password: '',
    };
  },
  
  handleUsernameChange: function handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  
  handlePasswordChange: function handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  },
  
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    
    this.props.onFormSubmit(this.state);
  },
  
  render: function render() {
    return (
      <div className="column">
        <h2 className="ui teal image header">
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <form className={`ui ${this.props.isSending ? 'loading' : ''} large form`}>
          <div className="ui stacked segment">
            <InputField
              onChange={this.handleUsernameChange}
              placeholder="Username"
              icon="user"
              type="text"
              value={this.state.username}
              error={this.props.errors.username}
            />
            
            <InputField
              onChange={this.handlePasswordChange}
              placeholder="Password"
              icon="lock"
              type="password"
              value={this.state.password}
              error={this.props.errors.password}
            />
  
            <button
              className="ui fluid large teal submit button"
              onClick={this.handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
  
        <div className="ui message">
          New to us? <a onClick={this.props.onPageToggle}>Sign Up</a>
        </div>
      </div>
    );
  },
});

export default ViewLoginForm;
