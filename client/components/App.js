/** client/components/App.js **/

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AddTask from '../containers/AddTask';
import ShowTasks from '../containers/ShowTasks';

const App = React.createClass( {
  render: function () {
    return (
      <div className="ui main container">
        <h2 className="ui dividing header">Tasks</h2>
        <ShowTasks />
        <br /><br /><br />
        <AddTask />
      </div>
    );
  }
} );

export default App;