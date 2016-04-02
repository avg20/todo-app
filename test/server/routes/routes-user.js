'use strict';

import { expect } from 'chai';
import User from '../../../server/models/user';
import mongoose from 'mongoose';
import routes from '../../../server/router/routes/user';
import mochaMongoose from 'mocha-mongoose';
import async from 'async';

const dbId = 'c90b6960-0109-11e2-9595-00248c45df8a';
const dbURI = `mongodb://localhost:27017/${dbId}`;
mochaMongoose(dbURI);

describe('User routes', () => {
  beforeEach((done) => {
    if (mongoose.connection.db) return done();
    
    mongoose.connect(dbURI, done);
    
    return null;
  });
  
  describe('/users/#get', () => {
    it('should find one user', (done) => {
      async.waterfall([
        (next) => {
          new User({ username: 'test', password: '1111' }).save(next);
        },
      ], (err, model) => {
        if (err) {
          throw err;
        }
        
        routes.getUsers({}, {
          json: (obj) => {
            expect(obj.status).to.equal('success');
            expect(obj.users[0].username).to.equal('test');
            expect(obj.users[0]._id.toHexString()).to.equal(model._id.toHexString());

            done();
          },
        });
      });
    });
    
    it('should find zero users', (done) => {
      routes.getUsers({}, {
        json: (obj) => {
          expect(obj.status).to.equal('success');
          expect(obj.users.length).to.equal(0);

          done();
        },
      });
    });
  });
  
  describe('/users/#post', () => {
    it('should save user correctly', (done) => {
      async.waterfall([
        (next) => {
          routes.addUser({ body: JSON.stringify({ username: 'test', password: '1111' }) }, {
            json: (obj) => {
              expect(obj.status).to.equal('success');
              
              User.findOne({ username: 'test' }, next);
            },
          });
        },
        (model, next) => {
          expect(model.username).to.equal('test');
          
          model.comparePassword('1111', next);
        },
      ], (err, isMatch) => {
        if (err) {
          throw err;
        }
        
        expect(isMatch).to.equal(true);
        done();
      });
    });
    
    it('should ask for username and password', (done) => {
      routes.addUser({ body: JSON.stringify({}) }, {
        json: (obj) => {
          expect(obj).to.deep.equal({
            status: 'error',
            errors: {
              password: 'Path `password` is required.',
              username: 'Path `username` is required.',
            },
          });
          done();
        },
      });
    });
    
    it('should catch duplicate username', (done) => {
      async.waterfall([
        (next) => {
          new User({ username: 'test', password: '1111' }).save(next);
        },
      ], (err) => {
        if (err) {
          throw err;
        }
        
        routes.addUser({ body: JSON.stringify({ username: 'test', password: '1111' }) }, {
          json: (obj) => {
            expect(obj).to.deep.equal({
              status: 'error',
              errors: {
                username: 'Such `username` already exist',
              },
            });
            done();
          },
        });
      });
    });
  });
  
  describe('/users/login#post', () => {
    it('should login correctly', (done) => {
      async.waterfall([
        (next) => {
          new User({ username: 'test', password: '1111' }).save(next);
        },
      ], (err) => {
        if (err) {
          throw err;
        }
        
        routes.loginUser({ body: JSON.stringify({ username: 'test', password: '1111' }) }, {
          json: (obj) => {
            expect(obj.status).to.equal('success');
            expect(obj.access_token).to.be.a('string');

            done();
          },
        });
      });
    });
    
    it('should fail to find user', (done) => {
      async.waterfall([
        (next) => {
          new User({ username: 'test', password: '1111' }).save(next);
        },
      ], (err) => {
        if (err) {
          throw err;
        }
        
        routes.loginUser({ body: JSON.stringify({ username: 'testtest', password: '1111' }) }, {
          json: (obj) => {
            expect(obj).to.deep.equal({
              status: 'error',
              errors: {
                username: 'User not found',
              },
            });

            done();
          },
        });
      });
    });
    
    it('should fail to compare user password', (done) => {
      async.waterfall([
        (next) => {
          new User({ username: 'test', password: '1111' }).save(next);
        },
      ], (err) => {
        if (err) {
          throw err;
        }
        
        routes.loginUser({ body: JSON.stringify({ username: 'test', password: '2222' }) }, {
          json: (obj) => {
            expect(obj).to.deep.equal({
              status: 'error',
              errors: {
                password: 'Not valid password',
              },
            });

            done();
          },
        });
      });
    });
  });
});
