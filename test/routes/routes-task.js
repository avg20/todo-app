'use strict';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const expect = require( 'chai' ).expect;
const mongoose = require( 'mongoose' );
const moment = require( 'moment' );
const dbURI = 'mongodb://localhost:27017/' + dbId;
const Task = require( '../../server/models/task' );
const User = require( '../../server/models/user' );
require( 'mocha-mongoose' )( dbURI );
const routes = require( '../../server/router/routes/task' );
const auth = require( '../../server/auth' );

const initAuth = ( done ) => {
  new User( { username: 'test', password: '1111' } ).save( ( err, model ) => {
    if ( err ) throw err;

    auth.user = model;
    done();
  } );
};

describe( 'Task routes', function () {
  beforeEach( ( done ) => {
    if ( mongoose.connection.db ) return initAuth( done );
    
    mongoose.connect( dbURI, ( err ) => {
      if ( err ) throw err;

      initAuth( done );
    } );
  } );
  
  describe( '/tasks/#get', function () {
    it( 'should find one task', function ( done ) {
      new Task( {
        name       : 'New Task',
        description: 'Description of new task',
        due_date   : moment().add( 3, 'days' ).valueOf(),
        user_id    : auth.user
      } ).save( ( err ) => {
        if ( err )throw err;

        routes.getTasks( {}, {
          json: ( obj ) => {
            expect( obj.status ).to.equal( 'success' );
            expect( obj.tasks.length ).to.equal( 1 );

            done();
          }
        } );
      } );
    } );
    
    it( 'should find zero tasks', function ( done ) {
      routes.getTasks( {}, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'success' );
          expect( obj.tasks.length ).to.equal( 0 );
          
          done();
        }
      } );
    } );
  } );


  describe( '/tasks/#post', function () {
    it( 'should add new task without errors', function ( done ) {
      routes.addTask( {
        body: {
          name       : 'New Task',
          description: 'Description of new task',
          due_date   : moment().add( 3, 'days' ).valueOf(),
          user_id    : auth.user
        }
      }, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'success' );

          done();
        }
      } );
    } );

    it( 'should fail adding task with errors', function ( done ) {
      routes.addTask( {}, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'error' );
          expect( obj.errors.length ).to.equal( 3 );

          done();
        }
      } );
    } );
  } );
} );