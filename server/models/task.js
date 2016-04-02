/** models/user.js **/
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Status:
 * 1 - not done
 * 2 - done
 */
const taskSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
  },
  parent_id: {
    type: Schema.Types.Mixed,
    default: -1,
  },
  due_date: {
    type: Date,
  },
  add_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    min: 1,
    max: 3,
    default: 1,
  },
  priority: {
    type: Number,
    default: 1,
  },
  overdue: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);
