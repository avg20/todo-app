/** models/access_token.js **/
'use strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const crypto = require( 'crypto' );
const moment = require( 'moment' );
const SECRET_KEY = "MY_OWN_SECRET";

const accessTokenSchema = new Schema( {
  token     : String,
  user_id   : Schema.Types.ObjectId,
  expiration: Number
} );

accessTokenSchema.pre( 'save', function ( next ) {
  let accessToken = this;

  accessToken.expiration = moment().add( 3, 'days' ).valueOf();
  accessToken.token = crypto.createHmac( 'sha256', SECRET_KEY )
    .update( accessToken.user_id + accessToken.expiration )
    .digest( 'hex' );

  next();
} );

module.exports = mongoose.model( 'AccessToken', accessTokenSchema );