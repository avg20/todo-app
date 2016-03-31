/** router/routes/task.js **/
'use strict';

const Message = require( '../../models/message' );
const auth = require( '../../auth' );

/**
 * Get list of unread message of current authorized user
 **/
module.exports.getMessages = ( req, res ) => {
  Message.find( { user_id: auth.user._id, read: false }, ( err, docs ) => {
    if ( err ) throw err;
    
    res.json( { status: 'success', messages: docs } );
  } );
};
