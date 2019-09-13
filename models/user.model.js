let mongoose = require("mongoose");

let UserSchema = require("../schemas/user.schema");

let User = (module.exports = mongoose.model("user", UserSchema));
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
