/** client/helpers/ErrorMessage.js **/

import React from 'react';

const ErrorMessage = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },
  
  render: function render() {
    if (this.props.text) {
      return <div className="help-text error">{this.props.text}</div>;
    }
    
    return null;
  },
});

export default ErrorMessage;
