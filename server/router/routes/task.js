/** router/routes/task.js **/
'use strict';

const Task = require('../../models/task');
const auth = require('../../auth');

/**
 * Get list of tasks of current authorized user
 **/
module.exports.getTasks = (req, res) => {
  const query = req.query;
  const filters = { user_id: auth.user._id };
  let sort = '';
  
  for (const field in query) {
    if (query.hasOwnProperty(field)) {
      if (field === 'token') continue;
      
      if (field === 'sort') {
        sort = query[field].replace(',', ' ');

        continue;
      }
      
      filters[field] = new RegExp(query[field]);
    }
  }
  
  Task.find(filters).sort(sort).exec((err, docs) => {
    if (err) throw err;
    
    res.json({ status: 'success', tasks: docs });
  });
};

/**
 * Add new task
 **/
module.exports.addTask = (req, res) => {
  const data = JSON.parse(req.body);
  data.user_id = auth.user._id;
  
  new Task(data).save((err, task) => {
    if (err) {
      const errors = {};
      for (const i in err.errors) {
        if (err.errors.hasOwnProperty(i)) {
          errors[i] = err.errors[i].message;
        }
      }
      
      res.json({ status: 'error', errors });
    } else {
      res.json({ status: 'success', task });
    }
  });
};

/**
 * Update exist task
 **/
module.exports.updateTask = (req, res) => {
  const data = JSON.parse(req.body);
  const query = {};
  query.user_id = auth.user._id;
  query._id = req.params.id;
  
  Task.findOneAndUpdate(query, data, { new: true }, (err, task) => {
    if (err) {
      const errors = {};
      for (const i in err.errors) {
        if (err.errors.hasOwnProperty(i)) {
          errors[i] = err.errors[i].message;
        }
      }
      
      res.json({ status: 'error', errors });
    } else {
      res.json({ status: 'success', task });
    }
  });
};

/**
 * Delete selected task
 **/
module.exports.deleteTask = (req, res) => {
  const query = {};
  query.user_id = auth.user._id;
  query._id = req.params.id;
  
  Task.remove(query, (err) => {
    if (err) {
      res.json({ status: 'error' });
    } else {
      res.json({ status: 'success' });
    }
  });
};
