/** models/user.js **/
'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const async = require('async');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
}).plugin(uniqueValidator, { message: 'Such `{PATH}` already exist' });

userSchema.pre('save', function beforeSave(next) {
  const user = this;
  
  if (!user.isModified('password')) return next();
  
  async.waterfall([
    (callback) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, callback);
    },
    (salt, callback) => {
      bcrypt.hash(user.password, salt, callback);
    },
    (hash, callback) => {
      user.password = hash;
      callback();
    },
  ], (err) => {
    if (err) {
      throw err;
    }
    
    next();
  });
  
  return null;
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) throw err;
    
    callback(null, isMatch);
  });
  
  return null;
};

module.exports = mongoose.model('User', userSchema);