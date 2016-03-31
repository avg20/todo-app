/** models/message.js **/
'use strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const crypto = require( 'crypto' );

const messageSchema = new Schema( {
  message: String,
  user_id: Schema.Types.ObjectId,
  read:    {
    type:    Boolean,
    default: false
  }
} );

module.exports = mongoose.model( 'Message', messageSchema );