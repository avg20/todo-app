/** auth.js **/
'use strict';

const Task = require('./models/task');
const Message = require('./models/message');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;

const checkDueDate = () => {
  Task.find({ overdue: false }, (err, tasks) => {
    if (err) throw err;
    
    for (const task of tasks) {
      const a = moment(task.due_date);
      const b = moment().startOf('day');
      const diff = parseInt(b.diff(a, 'days'), 10);
      
      if (diff > 0) {
        task.overdue = true;
        task.save((err1) => {
          if (err1) throw err1;

          const data = {
            message: `Task "${task.name}" is overdue`,
            user_id: new ObjectId(task.user_id),
            read: false,
          };
  
          new Message(data).save((err2) => {
            if (err2) throw err2;
          });
        });
      }
    }
  });
};

module.exports = () => {
  setInterval(checkDueDate, 2000);
};
