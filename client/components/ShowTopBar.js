/** client/components/ShowTopBar.js **/

import React from 'react';
import moment from 'moment';

const ShowTopBar = React.createClass( {
  componentWillUnmount: function () {
    jQuery( this.refs.sortPopup ).dropdown( 'destroy' );
  },
  
  componentDidMount: function () {
    jQuery( this.refs.sortPopup ).dropdown();
  },
  
  componentDidUpdate: function () {
    jQuery( this.refs.sortPopup ).calendar( 'refresh' );
  },
  
  render: function () {
    return (
      <div className="ui segment top-line">
        <div className="top-line__add-button">
          <button type="submit" className="ui teal basic button" onClick={this.props.onClickCreateNew}>Add Task</button>
        </div>
    
        <div className="top-line__sort-button">
          <div className="ui icon top right pointing dropdown button" ref="sortPopup">
            <i className="exchange icon"/>
            <div className="menu">
              <div className="item"><i className="sort content descending icon"/> Name</div>
              <div className="item"><i className="sort content descending icon"/> Due Date</div>
              <div className="item"><i className="sort content descending icon"/> Priority</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
} );

export default ShowTopBar;