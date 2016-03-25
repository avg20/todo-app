'use strict';

const dbId = "todo";
const fs = require( 'fs' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const auth = require( './server/auth' );
const dbURI = 'mongodb://localhost:27017/' + dbId;
const app = express();

if ( !mongoose.connection.db ) {
  mongoose.connect( dbURI, ( err ) => {
    if ( err ) throw err;
  } );
}

app.set( 'port', 3000 );
app.use( '/', express.static( 'public' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( auth.init );

require( './server/router/index' )( app );

app.listen( app.get( 'port' ) );
