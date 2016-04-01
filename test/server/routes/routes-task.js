'use strict';

import { expect } from 'chai';
import moment from 'moment';
import Task from '../../../server/models/task';
import User from '../../../server/models/user';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';
import routes from '../../../server/router/routes/task';
import auth from '../../../server/auth';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = 'mongodb://localhost:27017/' + dbId;
mochaMongoose( dbURI );

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
        name:        'New Task',
        description: 'Description of new task',
        due_date:    moment().add( 3, 'days' ).valueOf(),
        user_id:     auth.user
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
        body: JSON.stringify( {
          name:        'New Task',
          description: 'Description of new task',
          due_date:    moment().add( 3, 'days' ).valueOf(),
          user_id:     auth.user
        } )
      }, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'success' );

          done();
        }
      } );
    } );
  } );
  
  describe( '/tasks/:id#post', function () {
    it( 'should update task without errors', function ( done ) {
      new Task( {
        name:    'New Task',
        user_id: auth.user
      } ).save( ( err, model ) => {
        if ( err )throw err;
        
        routes.updateTask( {
          params: { id: model._id },
          body:   JSON.stringify( {
            name:    'New Task 1',
            user_id: auth.user
          } )
        }, {
          json: ( obj ) => {
            expect( obj.status ).to.equal( 'success' );
            
            Task.findOne( { _id: model._id }, ( err, task ) => {
              if ( err ) throw err;
              
              expect( task.name ).to.equal( 'New Task 1' );
              
              done();
            } );
          }
        } );
      } );
      
    } );
  } );
  
  describe( '/tasks/:id#delete', function () {
    it( 'should delete task without errors', function ( done ) {
      new Task( {
        name:    'New Task',
        user_id: auth.user
      } ).save( ( err, model ) => {
        if ( err )throw err;
        
        routes.deleteTask( {
          params: { id: model._id }
        }, {
          json: ( obj ) => {
            expect( obj.status ).to.equal( 'success' );
            
            Task.count( {}, ( err, count ) => {
              if ( err ) throw err;
              
              expect( count ).to.equal( 0 );
              
              done();
            } );
          }
        } );
      } );

    } );
  } );
} );