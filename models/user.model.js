const mongoose = require("mongoose");

const UserSchema = require("../schemas/user.schema");

const User = (module.exports = mongoose.model("user", UserSchema));
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
