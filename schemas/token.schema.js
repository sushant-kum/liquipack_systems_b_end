let mongoose = require('mongoose');
let path = require('path');

const base_path = path.dirname(require.main.filename);

let jwt_config = require(base_path + "/configs/jwt.config.js");

let TokenSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  created_timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  last_updated_timestamp: {
    type: Date,
    default: null
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = TokenSchema;