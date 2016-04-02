'use strict';

import { expect } from 'chai';
import User from '../../../server/models/user';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';
import async from 'async';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = `mongodb://localhost:27017/${dbId}`;
mochaMongoose(dbURI);

describe('User Model', () => {
  beforeEach((done) => {
    if (mongoose.connection.db) return done();
    
    mongoose.connect(dbURI, done);
    
    return null;
  });
  
  it('should save', (done) => {
    new User({ username: 'Test', password: '1111' }).save(done);
  });
  
  it('should return error trying to save duplicate username', (done) => {
    async.waterfall([
      (next) => {
        new User({ username: 'Test', password: '1111' }).save(next);
      },
      (model, status, next) => {
        new User({ username: 'Test', password: '1111' }).save(next);
      },
    ], (err) => {
      expect(err.errors.username.kind).to.equal('user defined');
      
      done();
    });
  });
  
  it('should find 2 records', (done) => {
    async.waterfall([
      (next) => {
        new User({ username: 'Test 1', password: '1111' }).save(next);
      },
      (model, status, next) => {
        new User({ username: 'Test 2', password: '1111' }).save(next);
      },
      (model, status, next) => {
        User.find({}, next);
      },
    ], (err, docs) => {
      if (err) throw err;
      
      expect(docs.length).to.equal(2);
      
      done();
    });
  });
  
  it('should find correct record', (done) => {
    async.waterfall([
      (next) => {
        new User({ username: 'Test 1', password: '1111' }).save(next);
      },
      (model, status, next) => {
        User.find({ username: 'Test 1' }, next);
      },
    ], (err, docs) => {
      if (err) throw err;
      
      expect(docs.length).to.equal(1);
      expect(docs[0].username).to.equal('Test 1');
      
      done();
    });
  });
  
  it('should return true from password compare function', (done) => {
    async.waterfall([
      (next) => {
        new User({ username: 'Test 1', password: '1111' }).save(next);
      },
      (model, status, next) => {
        User.find({ username: 'Test 1' }, next);
      },
      (models, next) => {
        models[0].comparePassword('1111', next);
      },
    ], (err, isMatch) => {
      if (err) throw err;
      
      expect(isMatch).to.equal(true);
      
      done();
    });
  });
  
  it('should return false from password compare function', (done) => {
    async.waterfall([
      (next) => {
        new User({ username: 'Test 1', password: '1111' }).save(next);
      },
      (model, status, next) => {
        User.find({ username: 'Test 1' }, next);
      },
      (models, next) => {
        models[0].comparePassword('1234', next);
      },
    ], (err, isMatch) => {
      if (err) throw err;
      
      expect(isMatch).to.equal(false);
      
      done();
    });
  });
});
