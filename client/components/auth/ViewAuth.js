/** client/components/auth/ViewAuth.js **/

import React from 'react';
import LoginForm from '../../containers/auth/LoginForm';
import SignupForm from '../../containers/auth/SignupForm';

const ViewAuth = React.createClass( {
  propTypes: {
    page: React.PropTypes.string.isRequired
  },

  componentDidMount: function () {
    document.querySelector( 'body' ).classList.add( 'auth' );
  },
  
  componentWillUnmount: function () {
    document.querySelector( 'body' ).classList.remove( 'auth' );
  },
  
  render: function () {
    let content;
  
    if ( this.props.page === 'login' )
      content = <LoginForm/>;
    else
      content = <SignupForm/>;
    
    return (
      <div className="ui middle aligned center aligned grid">
        {content}
      </div>
    );
  }
} );

export default ViewAuth;