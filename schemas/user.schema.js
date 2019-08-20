let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  app_permissions: {
    type: [{
      app: String,
      permissions: [String]
    }],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  gender: String,
  created_date: {
    type: Date,
    default: Date.now
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = UserSchema;