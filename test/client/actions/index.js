'use strict';

describe( 'Actions', function () {
  describe( 'Auth', function () {
    require( './auth/auth-actions' );
    require( './auth/auth-login' );
    require( './auth/auth-signup' );
  } );
  
  describe( 'Task', function () {
    require( './task/task-actions' );
    require( './task/task-active' );
    require( './task/task-add' );
    require( './task/task-save' );
    require( './task/task-delete' );
  } );
  
  require( './tasks-fetch' );
  require( './messages-fetch' );
  require( './tasks' );
} );