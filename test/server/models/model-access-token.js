'use strict';

import { expect } from 'chai';
import AccessToken from '../../../server/models/access_token';
import User from '../../../server/models/user';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';
import async from 'async';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = `${process.env.DB_HOST}/${dbId}`;
mochaMongoose(dbURI);

let userId;

const addNewUser = (done) => {
  new User({ username: 'Test', password: '1111' }).save((err, model) => {
    if (err) throw err;
    
    userId = model._id;
    done();
  });
};

describe('Access Token Model', () => {
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
      
      addNewUser(done);
    });
    
    return null;
  });
  
  it('should save', (done) => {
    new AccessToken({ user_id: userId }).save(done);
  });
  
  it('should find 2 records', (done) => {
    async.waterfall([
      (next) => {
        new AccessToken({ user_id: userId }).save(next);
      },
      (model, status, next) => {
        new AccessToken({ user_id: userId }).save(next);
      },
      (model, status, next) => {
        AccessToken.find({}, next);
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
        new AccessToken({ user_id: userId }).save(next);
      },
      (model, status, next) => {
        AccessToken.find({ token: model.token }, (err, models) => {
          next(err, model, models);
        });
      },
    ], (err, model, models) => {
      if (err) {
        throw err;
      }
      
      expect(models.length).to.equal(1);
      expect(models[0].token).to.equal(model.token);
      expect(models[0].expiration).to.equal(model.expiration);
      
      done();
    });
  });
});
