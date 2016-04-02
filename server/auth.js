/** auth.js **/
'use strict';

const AccessToken = require('./models/access_token');
const User = require('./models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const async = require('async');

/**
 * Authorized user object
 **/
module.exports.user = null;

/**
 * Init module, check access token from request and find user by access token
 **/
module.exports.init = (req, res, callback) => {
  const token = req.body.token || req.query.token;
  
  async.waterfall([
    (next) => {
      AccessToken.findOne({ token }, next);
    },
    (accessToken, next) => {
      if (accessToken !== null) {
        User.findOne({ _id: new ObjectId(accessToken.user_id) }, next);
      } else {
        next(null);
      }
    },
  ], (err, user) => {
    if (err) {
      throw err;
    }
    
    if (user !== null) {
      module.exports.user = user;
    }
    
    callback();
  });
};

/**
 * Check, if user are authorized
 **/
module.exports.check = (req, res, next) => {
  if (module.exports.user === null) {
    res.sendStatus(401);
  } else {
    next();
  }
};
