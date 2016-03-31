'use strict';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const expect = require( 'chai' ).expect;
const mongoose = require( 'mongoose' );
const moment = require( 'moment' );
const dbURI = 'mongodb://localhost:27017/' + dbId;
const Message = require( '../../server/models/message' );
const User = require( '../../server/models/user' );
const routes = require( '../../server/router/routes/message' );
const auth = require( '../../server/auth' );
require( 'mocha-mongoose' )( dbURI );

const initAuth = ( done ) => {
  new User( { username: 'test', password: '1111' } ).save( ( err, model ) => {
    if ( err ) throw err;
    
    auth.user = model;
    done();
  } );
};

describe( 'Message routes', function () {
  beforeEach( ( done ) => {
    if ( mongoose.connection.db ) return initAuth( done );
    
    mongoose.connect( dbURI, ( err ) => {
      if ( err ) throw err;
      
      initAuth( done );
    } );
  } );
  
  describe( '/messages/#get', function () {
    it( 'should find one message and mark it as read', function ( done ) {
      new Message( {
        message: 'New Task',
        user_id: auth.user._id
      } ).save( ( err, model ) => {
        if ( err )throw err;
        
        expect( model.read ).to.equal( false );
        
        routes.getMessages( {}, {
          json: ( obj ) => {
            expect( obj.status ).to.equal( 'success' );
            expect( obj.messages.length ).to.equal( 1 );
            
            Message.findOne( { _id: model._id }, ( err, message ) => {
              if ( err ) throw err;
              
              expect( message.message ).to.equal( 'New Task' );
              expect( message.read ).to.equal( true );
              expect( message.user_id.toHexString() ).to.equal( auth.user._id.toHexString() );
              
              done();
            } );
          }
        } );
      } );
    } );
    
    it( 'should find zero tasks', function ( done ) {
      routes.getMessages( {}, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'success' );
          expect( obj.messages.length ).to.equal( 0 );
          
          done();
        }
      } );
    } );
  } );
} );