/** client/components/App.js **/

import React from 'react';
import AddTask from '../containers/AddTask';
import ShowTasks from '../containers/ListTasks';
import TopBar from '../containers/TopBar';
import Notify from '../helpers/Notify';

const App = React.createClass( {
  render: function () {
    const leftSide = this.props.isSelected;

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
  }
} );

export default App;