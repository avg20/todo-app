/** router/index.js **/
'use strict';

const auth = require('../auth.js');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const messageRoutes = require('./routes/message');

module.exports = (app) => {
  app.get('/users', auth.check, userRoutes.getUsers);
  app.post('/users', userRoutes.addUser);
  app.post('/users/login', userRoutes.loginUser);
  
  app.get('/messages', auth.check, messageRoutes.getMessages);
  
  app.get('/tasks', auth.check, taskRoutes.getTasks);
  app.post('/tasks', auth.check, taskRoutes.addTask);
  app.post('/tasks/:id', auth.check, taskRoutes.updateTask);
  app.delete('/tasks/:id', auth.check, taskRoutes.deleteTask);
};
