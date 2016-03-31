/** client/components/Task.js **/

import React from 'react';
import moment from 'moment';

const Task = React.createClass( {
  getPriorityIconClass: function () {
    switch ( this.props.priority ) {
      case 1:
        return 'task__priority task__priority--low';
      
      case 2:
        return 'task__priority task__priority--medium';
      
      case 3:
        return 'task__priority task__priority--high';
      
      default:
        return 'task__priority';
    }
  },
  
  getTaskClass: function () {
    if ( this.props._id == this.props.activeItem._id )
      return "ui segment task task--selected";
    
    return "ui segment task";
  },
  
  getStatusButton: function () {
    switch ( this.props.status ) {
      case 2:
        return (
          <button onClick={this.handleButtonClick} className="circular mini ui icon green basic button">
            <i className="checkmark icon"/>
          </button>
        );
      
      case 3:
        return (
          <button onClick={this.handleButtonClick} className="circular mini ui icon red basic button">
            <i className="icon"/>
          </button>
        );
      
      default:
        return (
          <button onClick={this.handleButtonClick} className="circular mini ui icon basic button">
            <i className="icon"/>
          </button>
        );
    }
  },
  
  handleButtonClick: function ( e ) {
    e.stopPropagation();

    console.log( "click only button" );
  },
  
  handleAddButtonClick: function ( e ) {
    e.stopPropagation();
    
    this.props.onAddClick( this.props );
  },
  
  handleTaskClick: function ( e ) {
    this.props.onClick( this.props );
  },
  
  isParent: function () {
    return this.props._id === this.props.activeItem.parent_id &&
      this.props.activeItem._id === undefined
  },
  
  render: function () {
    let children = this.props.children.map( ( task ) =>
      <Task className="child"
            onClick={this.props.onClick}
            onAddClick={this.props.onAddClick}
            activeItem={this.props.activeItem}
            key={task._id} {...task}/> );

    return (
      <div className={this.props.className}>
        <div className={this.getTaskClass()} onClick={this.handleTaskClick}>
          <div className="task__checkbox">
            {this.getStatusButton()}
          </div>
          <div className="task__add-button" onClick={this.handleAddButtonClick}>
            <button className="circular mini ui icon green basic button">
              <i className="plus icon"/>
            </button>
          </div>
          <div className="task__name">
            <strong>{this.props.name}</strong>
            {this.isParent() ? <i className="task__parent-indicator angle double down icon"/> : ""}
          </div>
          <div className="task__due-date">
            <div className={`${this.props.overdue ? "task__due-date--overdue" : ""} ui label`}>
              <i className="calendar icon"/> Due to {moment( this.props.due_date ).calendar()}
            </div>
          </div>
          <div className={this.getPriorityIconClass()}>
            <i className="star icon"/>
          </div>
        </div>
        {children}
      </div>
    );
  }
} );

export default Task;