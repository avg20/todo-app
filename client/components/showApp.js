/** client/components/App.js **/

import React from 'react';
import AddTask from '../containers/AddTask';
import ShowTasks from '../containers/ListTasks';
import TopBar from '../containers/TopBar';

const App = React.createClass( {
  render: function () {
    let content = "";

    if ( !this.props.isSelected )
      content = (
        <div className="ui main">
          <TopBar />
          <ShowTasks />
        </div>
      );
    else
      content = (
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

    return (
      <div>
        <h2 className="ui dividing header">Tasks</h2>
        {content}
      </div>
    );
  }
} );

export default App;