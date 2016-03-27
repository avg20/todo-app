/** client/helpers/ErrorMessage.js **/

import React from 'react';

const ErrorMessage = React.createClass( {
  render: function () {
    if ( this.props.children === "" )
      return <p className="add-form__error-text add-form__error-text--hidden">{this.props.children}</p>;

    return <p className="add-form__error-text">{this.props.children}</p>;
  }
} );

export default ErrorMessage;