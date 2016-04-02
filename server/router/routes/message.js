/** router/routes/task.js **/
'use strict';

const Message = require('../../models/message');
const auth = require('../../auth');
const async = require('async');

/**
 * Get list of unread message of current authorized user
 **/
module.exports.getMessages = (req, res) => {
  const updateQuery = { user_id: auth.user._id };
  const findQuery = { user_id: auth.user._id, read: false };
  
  async.waterfall([
    (next) => {
      Message.find(findQuery, next);
    },
    (messages, next) => {
      Message.update(updateQuery, { read: true }, (err) => {
        next(err, messages);
      });
    },
  ], (err, messages) => {
    if (err) {
      throw err;
    }
    
    res.json({ status: 'success', messages });
  });
};
