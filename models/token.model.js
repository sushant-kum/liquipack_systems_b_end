let mongoose  = require('mongoose');
let path = require('path');
const base_path = path.dirname(require.main.filename);

let TokenSchema = require(base_path + '/schemas/token.schema');

let Token = module.exports = mongoose.model('token', TokenSchema);
module.exports.get = function(callback, limit) {
    Token.find(callback).limit(limit);
};