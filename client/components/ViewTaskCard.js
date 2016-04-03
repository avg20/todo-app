/** client/components/ViewTaskForm.js **/

import React from 'react';
import moment from 'moment';

const ViewTaskForm = React.createClass({
  propTypes: {
    isSending: React.PropTypes.bool.isRequired,
    isFailed: React.PropTypes.bool.isRequired,
    item: React.PropTypes.object.isRequired,
    errors: React.PropTypes.array.isRequired,
  
    onCloseTask: React.PropTypes.func.isRequired,
    onAddTask: React.PropTypes.func.isRequired,
    onDeleteTask: React.PropTypes.func.isRequired,
  },
  
  componentWillMount: function componentWillMount() {
    this.replaceState(this.props.item);
  },
  
  componentDidMount: function componentDidMount() {
    jQuery(this.refs.datepicker).calendar({
      type: 'date',
      formatter: {
        date: function date(currentDate) {
          return moment(currentDate.toISOString()).format('MM/DD/YYYY');
        },
      },
      onChange: (date) => {
        this.setState({ due_date: moment(date.toISOString()) });
      },
    });
    jQuery(this.refs.priorityDropdown).dropdown();
  },
  
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    this.replaceState(props.item);
  },
  
  componentDidUpdate: function componentDidUpdate() {
    jQuery(this.refs.priorityDropdown).dropdown('refresh');
    jQuery(this.refs.datepicker).calendar('refresh');
  },
  
  componentWillUnmount: function componentWillUnmount() {
    jQuery(this.refs.priorityDropdown).dropdown('destroy');
    jQuery(this.refs.datepicker).calendar('destroy');
  },
  
  getPriorityFlagClass: function getPriorityFlagClass() {
    switch (this.state.priority) {
      case 1:
        return 'task-card__priority-flag--low flag icon';
      
      case 2:
        return 'task-card__priority-flag--medium flag icon';
      
      case 3:
        return 'task-card__priority-flag--high flag icon';
      
      default:
        return 'flag icon';
    }
  },
  
  handleNameChange: function handleNameChange(e) {
    this.setState({ name: e.target.value });
  },
  
  handleDescriptionChange: function handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  },
  
  handlePriorityChange: function handlePriorityChange(val) {
    return () => {
      this.setState({ priority: val });
    };
  },
  
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    
    this.props.onAddTask(this.state);
  },
  
  handleDeleteClick: function handleDeleteClick() {
    this.props.onDeleteTask(this.state);
  },
  
  render: function render() {
    const priorityButtonClass = 'circular ui icon top left pointing dropdown ' +
      'basic button task-card__priority-flag';
    
    return (
      <div className="ui segments">
        <div className={`ui ${this.props.isSending ? 'loading' : ''} card form task-card`}>
          <div className="content task-card__top-line">
            <div className="ui fluid input task-card__top-input">
              <input
                type="text"
                placeholder="Task Name..."
                onChange={this.handleNameChange}
                value={this.state.name}
              />
            </div>
  
            <button
              onClick={this.handleDeleteClick}
              className="circular ui icon basic button task-card__remove-button"
            >
              Remove Task
            </button>
  
            <div
              className={priorityButtonClass}
              ref="priorityDropdown"
            >
              <i className={this.getPriorityFlagClass()} />
              <div className="menu">
                <div className="item" onClick={this.handlePriorityChange(3)}>
                  <i className="task-card__priority-flag--high flag icon" />
                </div>
                <div className="item" onClick={this.handlePriorityChange(2)}>
                  <i className="task-card__priority-flag--medium flag icon" />
                </div>
                <div className="item" onClick={this.handlePriorityChange(1)}>
                  <i className="task-card__priority-flag--low flag icon" />
                </div>
              </div>
            </div>
  
            <button
              onClick={this.props.onCloseTask}
              className="circular ui icon basic button task-card__close-button"
            >
              <i className="remove icon" />
            </button>
          </div>
  
          <div className="content">
            <div className="field">
              <textarea
                placeholder="Task Description..."
                onChange={this.handleDescriptionChange}
                value={this.state.description}
              />
            </div>
          </div>
  
          <div className="extra content task-card__bottom-line">
            <div className="task-card__submit-button">
              <button
                type="submit"
                className="ui teal button"
                tabIndex="0"
                onClick={this.handleSubmit}
              >
                Save Task
              </button>
            </div>
    
            <div className="task-card__datepicker ui calendar inline field" ref="datepicker">
              <label>Due to: </label>
              <input
                type="text"
                defaultValue={moment(this.state.due_date).format('MM/DD/YYYY')}
              />
            </div>
          </div>
        </div>
      </div >
    );
  },
});

export default ViewTaskForm;
