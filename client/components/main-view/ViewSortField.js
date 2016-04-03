/** client/components/main-view/ViewSortField.js **/

import React from 'react';

const ViewSortField = React.createClass({
  propTypes: {
    sort: React.PropTypes.object,
    onSortClick: React.PropTypes.func,
  },

  componentDidMount: function componentDidMount() {
    jQuery(this.refs.sortPopup).dropdown();
  },

  componentDidUpdate: function componentDidUpdate() {
    jQuery(this.refs.sortPopup).dropdown('refresh');
  },

  componentWillUnmount: function componentWillUnmount() {
    jQuery(this.refs.sortPopup).dropdown('destroy');
  },

  getSorts: function getSorts() {
    return [
      { text: 'Name', field: 'name', val: 1 },
      { text: 'Name', field: 'name', val: -1 },

      { text: 'Due Date', field: 'due_date', val: 1 },
      { text: 'Due Date', field: 'due_date', val: -1 },

      { text: 'Priority', field: 'priority', val: 1 },
      { text: 'Priority', field: 'priority', val: -1 },
    ];
  },

  render: function render() {
    let list = this.getSorts().map((value) => {
      const isActive = (value.field === this.props.sort.field && value.val === this.props.sort.val);
      const itemKey = `${value.val === -1 ? '-' : ''}${value.field}`;
      const direction = value.val === 1 ? 'ascending' : 'descending';

      return (
        <div
          key={itemKey}
          className={`item ${(isActive ? 'selected active' : '')}`}
          onClick={this.props.onSortClick(value.field, value.val) }
        >
          <i className={`sort content ${direction} icon`} /> {value.text}
        </div>
      );
    });

    return (
      <div>
        <label className="sort-wrapper__label">Sort by: </label>
        <div className="sort-wrapper__dropdown ui top right pointing dropdown" ref="sortPopup">
          <span className="text"><i className="sort content ascending  icon" /> Name</span>
          <div className="menu">
            {list}
          </div>
        </div>
      </div>
    );
  },
});

export default ViewSortField;
