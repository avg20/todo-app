/** client/helpers/InputField.js **/

import React from 'react';
import ErrorMessage from './ErrorMessage';

const InputField = (props) => (
  <div className="field">
    <div className="ui left icon input">
      <i className={`${props.icon} icon`} />
      <input
        onChange={props.onChange}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
      />
    </div>
    <ErrorMessage text={props.error} />
  </div>
);

InputField.propTypes = {
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  icon: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,

  onChange: React.PropTypes.func.isRequired,
};

export default InputField;
