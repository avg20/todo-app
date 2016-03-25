/** models/user.js **/
'use strict';

const mongoose = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );
const Schema = mongoose.Schema;
const bcrypt = require( 'bcrypt' );
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema( {
  username: {
    type    : String,
    required: true,
    index   : { unique: true }
  },
  password: {
    type    : String,
    required: true
  }
} ).plugin( uniqueValidator, { message: 'Such `{PATH}` already exist' } );

userSchema.pre( 'save', function ( next ) {
  let user = this;

  if ( !user.isModified( 'password' ) ) return next();

  bcrypt.genSalt( SALT_WORK_FACTOR, function ( err, salt ) {
    if ( err ) return next( err );

    bcrypt.hash( user.password, salt, function ( err, hash ) {
      if ( err ) return next( err );

      user.password = hash;
      next();
    } );
  } );
} );

userSchema.methods.comparePassword = function ( candidatePassword, callback ) {
  bcrypt.compare( candidatePassword, this.password, function ( err, isMatch ) {
    if ( err ) throw err;

    callback( null, isMatch );
  } );
};

module.exports = mongoose.model( 'User', userSchema );