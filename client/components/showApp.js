/** client/components/App.js **/

import React from 'react';
import AddTask from '../containers/AddTask';
import ShowTasks from '../containers/ListTasks';
import TopBar from '../containers/TopBar';
import Notify from '../helpers/Notify';
import Auth from '../containers/Auth';

const App = React.createClass( {
  showMessages: function () {
    if ( this.props.messages.length ) {
      this.props.messages.forEach( ( value ) => {
        
        this.refs.notify.error( value.message, 0 );
        this.props.onMessageDisplayed( value._id );
      } );
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
        <Auth />
      );
    }

  }
} );

export default App;