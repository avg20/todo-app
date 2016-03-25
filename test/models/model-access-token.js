'use strict';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const expect = require( 'chai' ).expect;
const AccessToken = require( '../../server/models/access_token' );
const User = require( '../../server/models/user' );
const mongoose = require( 'mongoose' );
const dbURI = 'mongodb://localhost:27017/' + dbId;
require( 'mocha-mongoose' )( dbURI );

let userId;

describe( 'Access Token Model', () => {
  before( ( done ) => {
    if ( mongoose.connection.db ) return done();

    mongoose.connect( dbURI, ( err ) => {
      if ( err ) throw err;

      AccessToken.remove( {}, ( err ) => {
        if ( err ) throw err;

        User.remove( {}, ( err ) => {
          if ( err ) throw err;

          new User( { username: 'Test', password: '1111' } ).save( ( err, model ) => {
            if ( err ) throw err;

            userId = model._id;
            done();
          } );
        } );
      } );
    } );
  } );

  it( 'should save', ( done ) => {
    new AccessToken( { user_id: userId } ).save( done );
  } );

  it( 'should find 2 records', ( done ) => {
    new AccessToken( { user_id: userId } ).save( ( err ) => {
      if ( err ) throw err;

      new AccessToken( { user_id: userId } ).save( ( err ) => {
        if ( err ) throw err;

        AccessToken.find( {}, ( err, docs ) => {
          if ( err ) throw err;

          expect( docs.length ).to.equal( 2 );

          done();
        } );
      } );
    } );
  } );

  it( 'should find correct record', ( done ) => {
    new AccessToken( { user_id: userId } ).save( ( err, model ) => {
      if ( err ) throw err;

      AccessToken.find( { token: model.token }, ( err, docs ) => {
        if ( err ) throw  err;

        expect( docs.length ).to.equal( 1 );
        expect( docs[ 0 ].token ).to.equal( model.token );
        expect( docs[ 0 ].expiration ).to.equal( model.expiration );

        done();
      } );
    } );
  } );
} );