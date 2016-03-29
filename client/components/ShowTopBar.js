/** client/components/ShowTopBar.js **/

import React from 'react';
import SortField from './ShowSortField';

const ShowTopBar = React.createClass( {
  getInitialState: function () {
    return {
      name:     1,
      due_date: -1,
      priority: 0
    };
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
          <SortField sort={this.props.sort} onSortClick={this.props.onSortClick}/>
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