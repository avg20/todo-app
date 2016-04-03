/** client/components/main-view/ViewTopBar.js **/

import { React } from 'react';
import SortField from './ViewSortField';

const ViewTopBar = React.createClass({
  propTypes: {
    filter: React.PropTypes.object.isRequired,
    sort: React.PropTypes.object.isRequired,
    
    onFilterName: React.PropTypes.func.isRequired,
    onFilterStatus: React.PropTypes.func.isRequired,
    onClickCreateNew: React.PropTypes.func.isRequired,
    onSortClick: React.PropTypes.func.isRequired,
  },
  
  getInitialState: function getInitialState() {
    return {
      filter: 1,
      completeButton: 0,
    };
  },
  
  componentDidMount: function componentDidMount() {
    jQuery(this.refs.filterDropdown).dropdown();
  },
  
  componentDidUpdate: function componentDidUpdate() {
    jQuery(this.refs.filterDropdown).dropdown('refresh');
  },
  
  componentWillUnmount: function componentWillUnmount() {
    jQuery(this.refs.filterDropdown).dropdown('destroy');
  },
  
  handleFilterChange: function handleFilterChange(e) {
    this.props.onFilterName(e.target.value);
  },
  
  handleDropdownChange: function handleDropdownChange(val) {
    return () => {
      switch (val) {
        case 1:
          this.props.onFilterName('');
          break;
        
        case 2:
          this.props.onFilterStatus(0);
          break;
    
        default:
      }
  
      this.setState({ filter: val });
    };
  },
  
  handleCompleteChange: function handleCompleteChange(val) {
    return () => {
      this.setState({ completeButton: val });
      this.props.onFilterStatus(val);
    };
  },
  
  render: function render() {
    let filter;
    
    if (this.state.filter === 1) {
      filter = (
        <input
          type="text"
          onChange={this.handleFilterChange}
          placeholder="Start typing name..."
          value={this.props.filter.val}
        />
      );
    } else {
      const button1Active = this.state.completeButton === 0 ? 'active' : '';
      const button2Active = this.state.completeButton === 2 ? 'active' : '';
      const button3Active = this.state.completeButton === 1 ? 'active' : '';
      
      filter = (
        <div className="ui buttons top-line__filter-buttons">
          <button
            onClick={this.handleCompleteChange(0)}
            className={`ui ${button1Active} top-line__filter-buttons__all basic button`}
          >
            All
          </button>
          
          <button
            onClick={this.handleCompleteChange(2)}
            className={`ui ${button2Active} top-line__filter-buttons__done basic button`}
          >
            <i className="checkmark box icon" />
          </button>
          
          <button
            onClick={this.handleCompleteChange(1)}
            className={`ui ${button3Active} top-line__filter-buttons__not-done basic button`}
          >
            <i className="square outline icon" />
          </button>
        </div>
      );
    }
    
    return (
      <div className="ui form segment top-line">
        <div className="top-line__add-button">
          <button
            type="submit"
            className="ui teal basic icon button"
            onClick={this.props.onClickCreateNew}
          >
            <i className="plus icon" /> Task
          </button>
        </div>
  
        <div className="top-line__filter ui left labeled left input">
          <div className="ui dropdown label" ref="filterDropdown">
            <div className="text">Filter by name:</div>
            <i className="dropdown icon" />
            <div className="menu">
              <div className="item" onClick={this.handleDropdownChange(1)}>Filter by name:</div>
              <div className="item" onClick={this.handleDropdownChange(2)}>Filter by status:</div>
            </div>
          </div>
          {filter}
        </div>
  
        <div className="top-line__sort-wrapper">
          <SortField sort={this.props.sort} onSortClick={this.props.onSortClick} />
        </div>
      </div>
    );
  },
});

export default ViewTopBar;
