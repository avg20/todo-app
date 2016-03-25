/** auth.js **/
'use strict';

const AccessToken = require( './models/access_token' );
const User = require( './models/user' );
const ObjectId = require( 'mongoose' ).Types.ObjectId;

/**
 * Authorized user object
 **/
module.exports.user = null;

/**
 * Init module, check access token from request and find user by access token
 **/
module.exports.init = ( req, res, next ) => {
  const token = req.body.token || req.query.token;

  AccessToken.findOne( { token: token }, ( err, accessToken ) => {
    if ( err ) throw err;

    if ( accessToken != null ) {
      User.findOne( { _id: new ObjectId( accessToken.user_id ) }, ( err, model ) => {
        if ( err ) throw err;

        module.exports.user = model;
        next();
      } );
    } else {
      next();
    }
  } );
};

/**
 * Check, if user are authorized
 **/
module.exports.check = ( req, res, next ) => {
  if ( module.exports.user === null ) {
    res.sendStatus( 401 );
  } else {
    next();
  }
};