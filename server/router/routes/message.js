/** router/routes/task.js **/
'use strict';

const Message = require('../../models/message');
const auth = require('../../auth');
const async = require('async');

/**
 * Get list of unread message of current authorized user
 **/
module.exports.getMessages = (req, res) => {
  const query = { user_id: auth.user._id };
  
  async.waterfall([
    (next) => {
      Message.update(query, { read: true }, next);
    },
    (result, next) => {
      Message.find(query, next);
    },
  ], (err, messages) => {
    if (err) {
      throw err;
    }
    
    res.json({ status: 'success', messages });
  });
};
