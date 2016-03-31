/** auth.js **/
'use strict';

const Task = require( './models/task' );
const Message = require( './models/message' );
const moment = require( 'moment' );
const ObjectId = require( 'mongoose' ).Types.ObjectId;

const checkDueDate = () => {
  Task.find( { overdue: false }, ( err, tasks ) => {
    if ( err ) throw err;
    
    for ( let task of tasks ) {
      const a = moment( task.due_date );
      const b = moment().startOf( 'day' );
      const diff = parseInt( b.diff( a, 'days' ) );
      
      if ( diff > 0 ) {
        task.overdue = true;
        task.save( ( err ) => {
          if ( err ) throw err;
  
          new Message( { message: `Task "${task.name}" is overdue`, user_id: new ObjectId( task.user_id ) } ).save( ( err ) => {
            if ( err ) throw err;
          } );
        } );
      }
    }
  } );
};

module.exports = () => {
  setInterval( checkDueDate, 2000 );
};