/** client/helpers/ErrorMessage.js **/

import React from "react"

const ErrorMessage = React.createClass( {
  render: function () {
    if ( this.props.text )
      return <div className="help-text error">{this.props.text}</div>;
    else
      return null;
  }
} );

export default ErrorMessage;