'use strict';

import moment from 'moment';
import Task from '../../../server/models/task';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = `${process.env.DB_HOST}/${dbId}`;
mochaMongoose(dbURI);

describe('Task Model', () => {
  beforeEach((done) => {
    if (mongoose.connection.db) return done();
    
    mongoose.connect(dbURI, done);
    
    return null;
  });
  
  it('should save task correctly', (done) => {
    new Task({
      name: 'New Task',
      description: 'Description of new task',
      due_date: moment().add(3, 'days').valueOf(),
    }).save(done);
  });
});
