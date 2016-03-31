'use strict';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const expect = require( 'chai' ).expect;
const Message = require( '../../server/models/message' );
const User = require( '../../server/models/user' );
const mongoose = require( 'mongoose' );
const dbURI = 'mongodb://localhost:27017/' + dbId;
require( 'mocha-mongoose' )( dbURI );

describe( 'Message Model', () => {
  before( ( done ) => {
    if ( mongoose.connection.db ) return done();
    
    mongoose.connect( dbURI, done() );
  } );
  
  it( 'should save', ( done ) => {
    new Message( { message: "Test Message" } ).save( done );
  } );
  
  it( 'should find 2 records', ( done ) => {
    new Message( { message: "Test Message" } ).save( ( err ) => {
      if ( err ) throw err;
      
      new Message( { message: "Test Message" } ).save( ( err ) => {
        if ( err ) throw err;
        
        Message.find( {}, ( err, docs ) => {
          if ( err ) throw err;
          
          expect( docs.length ).to.equal( 2 );
          
          done();
        } );
      } );
    } );
  } );
  
  it( 'should find correct record', ( done ) => {
    new Message( { message: "Test Message 1" } ).save( ( err, model ) => {
      if ( err ) throw err;
      
      Message.find( { message: model.message }, ( err, docs ) => {
        if ( err ) throw  err;
        
        expect( docs.length ).to.equal( 1 );
        expect( docs[ 0 ].message ).to.equal( "Test Message 1" );
        
        done();
      } );
    } );
  } );
} );