/** client/components/App.js **/

import React from 'react';
import AddTask from '../containers/AddTask';
import ShowTasks from '../containers/ListTasks';
import TopBar from '../containers/TopBar';
import Notify from '../helpers/Notify';
import Auth from '../containers/Auth';
import TopMenu from '../containers/TopMenu';

const App = React.createClass( {
  showMessages: function () {
    if ( this.props.messages.length ) {
      const value = this.props.messages[ 0 ];

      if ( value.type === 'success' )
        this.refs.notify.success( value.message, 0 );
      else
        this.refs.notify.error( value.message, 0 );

      this.props.onMessageDisplayed( value._id );
    }
  },
  
  componentDidMount: function () {
    this.showMessages();
  },
  
  componentDidUpdate: function () {
    this.showMessages();
  },
  
  render: function () {
    const leftSide = this.props.isSelected;
    
    if ( this.props.isAuthorized ) {
      return (
        <div className="ui container main stackable divided grid">
          <TopMenu/>
          <Notify ref="notify"/>
          <div className="row">
            <div className={`${leftSide ? "ten" : "sixteen"} wide column main__column`}>
              <TopBar />
              <ShowTasks />
            </div>
            {
              leftSide ? <div className="six wide column main__column"><AddTask /></div> : ""
            }
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Notify ref="notify"/>
          <Auth />
        </div>
      );
    }

  }
} );

export default App;