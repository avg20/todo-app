/** router/routes/task.js **/
'use strict';

const Message = require( '../../models/message' );
const auth = require( '../../auth' );

/**
 * Get list of unread message of current authorized user
 **/
module.exports.getMessages = ( req, res ) => {
  const query = { user_id: auth.user._id, read: false };
  
  Message.find( query, ( err, docs ) => {
    if ( err ) throw err;
    
    Message.update( query, { read: true }, ( err ) => {
      if ( err ) throw err;
      
      res.json( { status: 'success', messages: docs } );
    } )
  } );
};
