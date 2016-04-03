/** client/helpers/InputField.js **/

import React from 'react';
import ErrorMessage from './ErrorMessage';

const InputField = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    icon: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
  
    onChange: React.PropTypes.func.isRequired,
  },
  
  render: function render() {
    return (
      <div className="field">
        <div className="ui left icon input">
          <i className={`${this.props.icon} icon`} />
          <input
            onChange={this.props.onChange}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
          />
        </div>
        <ErrorMessage text={this.props.error} />
      </div>
    );
  },
});

export default InputField;
