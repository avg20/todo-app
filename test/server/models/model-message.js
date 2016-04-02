'use strict';

import { expect } from 'chai';
import Message from '../../../server/models/message';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';
import async from 'async';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = `mongodb://localhost:27017/${dbId}`;
mochaMongoose(dbURI);

describe('Message Model', () => {
  before((done) => {
    if (mongoose.connection.db) return done();
    
    async.waterfall([
      (next) => {
        mongoose.connect(dbURI, next);
      },
    ], (err) => {
      if (err) {
        throw err;
      }
      
      done();
    });
    
    return null;
  });
  
  it('should save', (done) => {
    new Message({ message: 'Test Message' }).save(done);
  });
  
  it('should find 2 records', (done) => {
    async.waterfall([
      (next) => {
        new Message({ message: 'Test Message' }).save(next);
      },
      (model, status, next) => {
        new Message({ message: 'Test Message' }).save(next);
      },
      (model, status, next) => {
        Message.find({}, next);
      },
    ], (err, docs) => {
      if (err) {
        throw err;
      }
      
      expect(docs.length).to.equal(2);
      
      done();
    });
  });
  
  it('should find correct record', (done) => {
    async.waterfall([
      (next) => {
        new Message({ message: 'Test Message 1' }).save(next);
      },
      (model, status, next) => {
        Message.find({ message: model.message }, next);
      },
    ], (err, docs) => {
      if (err) {
        throw err;
      }
      
      expect(docs.length).to.equal(1);
      expect(docs[0].message).to.equal('Test Message 1');
      
      done();
    });
  });
});
