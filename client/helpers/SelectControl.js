/** client/helpers/SelectControl.js **/

import React from 'react';

const SelectControl = React.createClass( {
  propTypes: {
    options  : React.PropTypes.array,
    onChanges: React.PropTypes.func
  },

  render: function () {
    var options = this.props.options.map( function ( option ) {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    } );

    return (
      <select className="ui fluid dropdown" onchange={this.props.onChange}>
        {options}
      </select>
    );
  }
} );

export default SelectControl;