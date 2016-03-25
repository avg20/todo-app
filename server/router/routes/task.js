/** router/routes/task.js **/
'use strict';

const Task = require( '../../models/task' );
const auth = require( '../../auth' );

/**
 * Get list of tasks of current authorized user
 **/
module.exports.getTasks = ( req, res ) => {
  const query = req.query;
  const filters = { user_id: auth.user._id };
  let sort = "";

  for ( var field in query )
    if ( query.hasOwnProperty( field ) ) {
      if ( field === 'token' ) continue;

      if ( field === 'sort' ) {
        sort = query[ field ].replace( ",", " " );

        continue;
      }

      filters[ field ] = new RegExp( query[ field ] );
    }

  Task.find( filters ).sort( sort ).exec( ( err, docs ) => {
    if ( err ) throw err;

    res.json( { status: 'success', tasks: docs } );
  } );
};

/**
 * Add new task
 **/
module.exports.addTask = ( req, res ) => {
  const data = req.body;
  data.user_id = auth.user._id;

  new Task( data ).save( ( err, model ) => {
    if ( err ) {
      const errors = [];
      for ( let i in err.errors ) {
        errors.push( { field: i, message: err.errors[ i ].message } );
      }

      res.json( { status: 'error', errors: errors } );
    } else
      res.json( { status: 'success', task: model } );
  } );
};
