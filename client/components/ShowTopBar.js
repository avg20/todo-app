/** client/components/ShowTopBar.js **/

import React from 'react';
import moment from 'moment';

const ShowTopBar = React.createClass( {
  getInitialState: function () {
    return {
      name:     1,
      due_date: -1,
      priority: 0
    };
  },

  componentWillUnmount: function () {
    jQuery( this.refs.sortPopup ).dropdown( 'destroy' );
  },

  componentDidMount: function () {
    jQuery( this.refs.sortPopup ).dropdown();
  },

  componentDidUpdate: function () {
    jQuery( this.refs.sortPopup ).calendar( 'refresh' );
  },
  
  handleFilterChange: function ( e ) {
    this.props.onFilterType( e.target.value );
  },
  
  render: function () {
    return (
      <div className="ui form segment top-line">
        <div className="top-line__add-button">
          <button type="submit" className="ui teal basic button" onClick={this.props.onClickCreateNew}>Add Task</button>
        </div>

        <div className="top-line__filter ui left labeled left input">
          <div className="ui label">Filter by name:</div>
          <input type="text" onChange={this.handleFilterChange} placeholder="Start typing name..." value={this.props.filter}/>
        </div>
  
        <div className="top-line__sort-wrapper">
          <label className="sort-wrapper__label">Sort by: </label>
          <div className="sort-wrapper__dropdown ui top right pointing dropdown" ref="sortPopup">
            <span className="text"><i className="sort content ascending icon"/> Name</span>
            <div className="menu">
              <div className="item active selected" onClick={this.props.onSortClick('name', 1)}><i className="sort content ascending icon"/> Name</div>
              <div className="item" onClick={this.props.onSortClick('name', -1)}><i className="sort content descending icon"/> Name</div>
  
              <div className="item" onClick={this.props.onSortClick('due_date', 1)}><i className="sort content ascending icon"/> Due Date</div>
              <div className="item" onClick={this.props.onSortClick('due_date', -1)}><i className="sort content descending icon"/> Due Date</div>
  
              <div className="item" onClick={this.props.onSortClick('priority', 1)}><i className="sort content ascending icon"/> Priority</div>
              <div className="item" onClick={this.props.onSortClick('priority', -1)}><i className="sort content descending icon"/> Priority</div>
            </div>
          </div>
        </div>
      </div>
    );
    /*
     <div className="item"><i className="sort content descending icon"/> Name</div>
     <div className="item"><i className="sort content descending icon"/> Due Date</div>
     <div className="item"><i className="sort content descending icon"/> Priority</div>
     */
  }
} );

export default ShowTopBar;