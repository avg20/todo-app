'use strict';

import { expect } from 'chai';
import moment from 'moment';
import Task from '../../../server/models/task';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = 'mongodb://localhost:27017/' + dbId;
mochaMongoose( dbURI );

describe( 'Task Model', () => {
  beforeEach( ( done ) => {
    if ( mongoose.connection.db ) return done();

    mongoose.connect( dbURI, done );
  } );

  it( 'should save task correctly', ( done ) => {
    new Task( {
      name:        'New Task',
      description: 'Description of new task',
      due_date:    moment().add( 3, 'days' ).valueOf()
    } ).save( done() );
  } );
} );