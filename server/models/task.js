/** models/user.js **/
'use strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const auth = require( '../../server/auth' );

/**
 * Status:
 * 1 - not done
 * 2 - done
 * 3 - overdue
 */
const taskSchema = new Schema( {
  name       : {
    type    : String,
    required: true,
    trim    : true
  },
  description: {
    type    : String,
    required: true,
    trim    : true
  },
  user_id    : {
    type: Schema.Types.ObjectId
    //default: auth.user
  },
  parent_id  : {
    type   : Schema.Types.Mixed,
    default: -1
  },
  due_date   : {
    type    : Date,
    required: true
  },
  add_date   : {
    type   : Date,
    default: Date.now
  },
  status     : {
    type   : Number,
    min    : 1,
    max    : 3,
    default: 1
  },
  priority   : {
    type   : Number,
    default: 0
  }
} );

module.exports = mongoose.model( 'Task', taskSchema );