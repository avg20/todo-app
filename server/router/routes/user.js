/** router/routes/user.js **/
'use strict';

const User = require( '../../models/user' );
const AccessToken = require( '../../models/access_token' );

/**
 * Get list of users
 **/
module.exports.getUsers = ( req, res ) => {
  User.find( {} ).select( 'username' ).exec( ( err, docs ) => {
    if ( err ) throw err;

    res.json( { status: 'success', users: docs } );
  } );
};

/**
 * Add new user with specified data to database
 **/
module.exports.addUser = ( req, res ) => {
  new User( req.body ).save( err => {
    if ( err ) {
      const errors = [];
      for ( let i in err.errors ) {
        errors.push( { field: i, message: err.errors[ i ].message } );
      }

      res.json( { status: 'error', errors: errors } );
    } else
      res.json( { status: 'success' } );
  } );
};

/**
 * Try to login user, if login is success - return access_token
 **/
module.exports.loginUser = ( req, res ) => {
  User.findOne( { username: req.body.username } ).exec( ( err, model ) => {
    if ( err ) throw err;

    if ( model === null ) {
      res.json( { status: 'error', errors: [ { field: 'username', message: 'User not found' } ] } );
      return;
    }

    model.comparePassword( req.body.password, ( err, isMatch ) => {
      if ( err ) throw err;

      if ( !isMatch ) {
        res.json( { status: 'error', errors: [ { field: 'password', message: 'Not valid password' } ] } );
      } else {
        new AccessToken( { user_id: model._id } ).save( ( err, model ) => {
          if ( err ) throw err;

          res.json( { status: 'success', access_token: model.token } );
        } );
      }
    } );
  } );
};
