/** router/index.js **/
'use strict';

const auth = require( '../auth.js' );
const userRoutes = require( './routes/user' );
const taskRoutes = require( './routes/task' );

module.exports = function ( app ) {
  app.get( '/users', auth.check, userRoutes.getUsers );
  app.post( '/users', userRoutes.addUser );
  app.post( '/users/login', userRoutes.loginUser );
  
  app.get( '/tasks', auth.check, taskRoutes.getTasks );
  app.post( '/tasks', auth.check, taskRoutes.addTask );
  app.delete( '/tasks/:id', auth.check, taskRoutes.deleteTask )
};