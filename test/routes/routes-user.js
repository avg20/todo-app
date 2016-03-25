'use strict';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const expect = require( 'chai' ).expect;
const mongoose = require( 'mongoose' );
const dbURI = 'mongodb://localhost:27017/' + dbId;
const User = require( '../../server/models/user' );
require( 'mocha-mongoose' )( dbURI );
const routes = require( '../../server/router/routes/user' );

describe( 'User routes', function () {
  beforeEach( ( done ) => {
    if ( mongoose.connection.db ) return done();

    mongoose.connect( dbURI, done );
  } );

  describe( '/users/#get', function () {
    it( 'should find one user', function ( done ) {
      new User( { username: 'test', password: '1111' } ).save( ( err, model ) => {
        if ( err )throw err;

        routes.getUsers( {}, {
          json: ( obj ) => {
            expect( obj.status ).to.equal( 'success' );
            expect( obj.users[ 0 ].username ).to.equal( 'test' );
            expect( obj.users[ 0 ]._id.toHexString() ).to.equal( model._id.toHexString() );

            done();
          }
        } );
      } );
    } );

    it( 'should find zero users', function ( done ) {
      routes.getUsers( {}, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'success' );
          expect( obj.users.length ).to.equal( 0 );

          done();
        }
      } );
    } );
  } );

  describe( '/users/#post', function () {
    it( 'should save user correctly', function ( done ) {
      routes.addUser( { body: { username: 'test', password: '1111' } }, {
        json: ( obj ) => {
          expect( obj.status ).to.equal( 'success' );

          User.findOne( { username: 'test' }, ( err, model ) => {
            if ( err ) throw err;

            expect( err ).to.equal( null );
            expect( model.username ).to.equal( 'test' );

            model.comparePassword( '1111', ( err, isMatch ) => {
              if ( err ) throw err;

              expect( isMatch ).to.equal( true );
              done();
            } );
          } );
        }
      } );
    } );

    it( 'should ask for username and password', function ( done ) {
      routes.addUser( { body: {} }, {
        json: ( obj ) => {
          expect( obj ).to.deep.equal( {
            status: 'error',
            errors: [ { field: 'password', message: 'Path `password` is required.' },
              { field: 'username', message: 'Path `username` is required.' } ]
          } );
          done();
        }
      } );
    } );

    it( 'should catch duplicate username', function ( done ) {
      new User( { username: 'test', password: '1111' } ).save( ( err, model ) => {
        if ( err ) throw err;

        routes.addUser( { body: { username: 'test', password: '1111' } }, {
          json: ( obj ) => {
            expect( obj ).to.deep.equal( {
              status: 'error',
              errors: [ { field: 'username', message: 'Such `username` already exist' } ]
            } );
            done();
          }
        } );
      } );
    } );
  } );

  describe( '/users/login#post', function () {
    it( 'should login correctly', function ( done ) {
      new User( { username: 'test', password: '1111' } ).save( ( err ) => {
        if ( err ) throw err;

        routes.loginUser( { body: { username: 'test', password: '1111' } }, {
          json: ( obj ) => {
            expect( obj.status ).to.equal( 'success' );
            expect( obj.access_token ).to.be.a( 'string' );

            done();
          }
        } );
      } );
    } );

    it( 'should fail to find user', function ( done ) {
      new User( { username: 'test', password: '1111' } ).save( ( err ) => {
        if ( err ) throw err;

        routes.loginUser( { body: { username: 'testtest', password: '1111' } }, {
          json: ( obj ) => {
            expect( obj ).to.deep.equal( {
              status: 'error',
              errors: [ { field: 'username', message: 'User not found' } ]
            } );

            done();
          }
        } );
      } );
    } );

    it( 'should fail to compare user password', function ( done ) {
      new User( { username: 'test', password: '1111' } ).save( ( err ) => {
        if ( err ) throw err;

        routes.loginUser( { body: { username: 'test', password: '2222' } }, {
          json: ( obj ) => {
            expect( obj ).to.deep.equal( {
              status: 'error',
              errors: [ { field: 'password', message: 'Not valid password' } ]
            } );

            done();
          }
        } );
      } );
    } );
  } );
} );