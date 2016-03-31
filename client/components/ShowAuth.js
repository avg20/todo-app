/** client/components/ShowAuth.js **/

import React from 'react';
import LoginForm from '../containers/LoginForm';
import SignupForm from '../containers/SignupForm';

const ShowLoginForm = React.createClass( {
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

export default ShowLoginForm;