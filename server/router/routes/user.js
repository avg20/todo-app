/** router/routes/user.js **/
'use strict';

const User = require('../../models/user');
const AccessToken = require('../../models/access_token');
const async = require('async');

/**
 * Get list of users
 **/
module.exports.getUsers = (req, res) => {
  User.find({}).select('username').exec((err, users) => {
    if (err) throw err;
    
    res.json({ status: 'success', users });
  });
};

/**
 * Add new user with specified data to database
 **/
module.exports.addUser = (req, res) => {
  new User(JSON.parse(req.body)).save(err => {
    if (err) {
      const errors = {};
      for (const i in err.errors) {
        if (err.errors.hasOwnProperty(i)) {
          errors[i] = err.errors[i].message;
        }
      }
      
      res.json({ status: 'error', errors });
    } else {
      res.json({ status: 'success' });
    }
  });
};

/**
 * Try to login user, if login is success - return access_token
 **/
module.exports.loginUser = (req, res) => {
  const body = JSON.parse(req.body);
  
  async.waterfall([
    (next) => {
      User.findOne({ username: body.username }).exec((err, model) => {
        if (model === null) {
          next(null, { status: 'error', errors: { username: 'User not found' } }, null);
        } else {
          next(null, null, model);
        }
      });
    },
    (error, model, next) => {
      if (error === null) {
        model.comparePassword(body.password, (err, isMatch) => {
          if (!isMatch) {
            next(err, { status: 'error', errors: { password: 'Not valid password' } }, null);
          } else {
            next(err, null, model);
          }
        });
      } else {
        next(null, error, null);
      }
    },
    (error, model, next) => {
      if (error === null) {
        new AccessToken({ user_id: model._id }).save((err, token) => {
          next(err, null, token);
        });
      } else {
        next(null, error, null);
      }
    },
  ], (err, error, token) => {
    if (err) throw err;
    
    if (error === null) {
      res.json({ status: 'success', access_token: token.token });
    } else {
      res.json(error);
    }
  });
};
