'use strict';

import { expect } from 'chai';
import Message from '../../../server/models/message';
import User from '../../../server/models/user';
import mongoose from 'mongoose';
import mochaMongoose from 'mocha-mongoose';
import routes from '../../../server/router/routes/message';
import auth from '../../../server/auth';
import async from 'async';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = `mongodb://localhost:27017/${dbId}`;
mochaMongoose(dbURI);

const initAuth = (done) => {
  new User({ username: 'test', password: '1111' }).save((err, model) => {
    if (err) throw err;
    
    auth.user = model;
    done();
  });
};

describe('Message routes', () => {
  beforeEach((done) => {
    if (mongoose.connection.db) return initAuth(done);
    
    mongoose.connect(dbURI, (err) => {
      if (err) throw err;
      
      initAuth(done);
    });
    
    return null;
  });
  
  describe('/messages/#get', () => {
    it('should find one message and mark it as read', (done) => {
      async.waterfall([
        (next) => {
          new Message({
            message: 'New Task',
            user_id: auth.user._id,
          }).save(next);
        },
        (model, status, next) => {
          expect(model.read).to.equal(false);
          
          routes.getMessages({}, {
            json: (obj) => {
              expect(obj.status).to.equal('success');
              expect(obj.messages.length).to.equal(1);
              
              Message.findOne({ _id: model._id }, next);
            },
          });
        },
      ], (err, message) => {
        if (err) {
          throw err;
        }
        
        expect(message.message).to.equal('New Task');
        expect(message.read).to.equal(true);
        expect(message.user_id.toHexString()).to.equal(auth.user._id.toHexString());
        
        done();
      });
    });
    
    it('should find zero tasks', (done) => {
      routes.getMessages({}, {
        json: (obj) => {
          expect(obj.status).to.equal('success');
          expect(obj.messages.length).to.equal(0);
          
          done();
        },
      });
    });
  });
});
