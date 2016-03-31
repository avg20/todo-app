/** client/components/App.js **/

import React from 'react';
import AddTask from '../containers/AddTask';
import ShowTasks from '../containers/ListTasks';
import TopBar from '../containers/TopBar';

const App = React.createClass( {
  render: function () {
    if ( !this.props.isSelected )
      return (
        <div className="ui main">
          <TopBar />
          <ShowTasks />
        </div>
      );
    else
      return (
        <div className="ui main stackable divided grid">
          <div className="row">
            <div className="ten wide column main__column">
              <TopBar />
              <ShowTasks />
            </div>
            <div className="six wide column main__column">
              <AddTask />
            </div>
          </div>
        </div>
      );
  }
} );

export default App;