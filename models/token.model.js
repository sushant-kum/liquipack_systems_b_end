const mongoose = require('mongoose');
const path = require('path');
const base_path = path.dirname(require.main.filename);

const TokenSchema = require(base_path + '/schemas/token.schema');

const Token = (module.exports = mongoose.model('token', TokenSchema));
module.exports.get = function(callback, limit) {
  Token.find(callback).limit(limit);
};
