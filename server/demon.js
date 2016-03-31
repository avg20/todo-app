/** auth.js **/
'use strict';

const Task = require( './models/task' );
const moment = require( 'moment' );

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
        } );
      }
    }
  } );
};

module.exports = () => {
  setInterval( checkDueDate, 2000 );
};