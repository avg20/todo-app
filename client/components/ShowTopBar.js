/** client/components/ShowTopBar.js **/

import React from 'react';
import moment from 'moment';

const ShowTopBar = React.createClass( {
  render: function () {
    return (
      <div className="ui segment">
        <button type="submit" className="ui teal basic button" onClick={this.props.onClickCreateNew}>Add Task</button>
      </div>
    );
  }
} );

export default ShowTopBar;