/** client/helpers/NotifyItem.js **/

import React from 'react';

const NotifyItem = React.createClass({
  propTypes: {
    theme: React.PropTypes.string.isRequired,
    msg: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    
    hideNotification: React.PropTypes.func.isRequired,
  },
  
  hideNotification: function hideNotification() {
    this.props.hideNotification(this.props.id);
  },
  
  render: function render() {
    return (
      <div className={`notify__item ui ${this.props.theme} message`}>
        <i className="close icon" onClick={this.hideNotification} />
        <div className="notify__item__header header">
          {this.props.msg}
        </div>
      </div>
    );
  },
});

export default NotifyItem;
