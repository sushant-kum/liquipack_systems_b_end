User = require('../models/user.model');

exports.findOne = function(query, callback) {
  User.findOne(query, function(error, user) {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
};

exports.index = function(callback) {
  User.get(function(error, users) {
    if (error) callback(error);
    else callback(null, users);
  });
};

exports.new = function(new_user, callback) {
  const user = new User();
  user.username = new_user.username;
  user.password_hash = new_user.password_hash;
  user.app_permissions = new_user.app_permissions
    ? new_user.app_permissions
    : [];
  user.name = new_user.name;
  user.gender = new_user.gender;
  user.email = new_user.email;
  user.phone = new_user.phone;
  user.save(function(error) {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
};

exports.view = function(user_id, callback) {
  User.findById(user_id, function(error, user) {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
};

exports.update = function(user_id, update_user, callback) {
  User.findById(user_id, function(error, user) {
    if (error) {
      res.json({
        status: 'error',
        message: error
      });
    } else {
      user.password_hash = update_user.password_hash;
      user.app_permissions = update_user.app_permissions;
      user.name = update_user.name;
      user.gender = update_user.gender;
      user.email = update_user.email;
      user.phone = update_user.phone;
      user.save(function(error) {
        if (error) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
    }
  });
};

exports.make_inactive = function(user_id, callback) {
  User.findById(user_id, function(error, user) {
    if (error) {
      callback(error);
    } else {
      user.is_active = false;
      user.save(function(error) {
        if (error) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
    }
  });
};

exports.make_active = function(user_id, callback) {
  User.findById(user_id, function(error, user) {
    if (error) {
      callback(error);
    } else {
      user.is_active = true;
      user.save(function(error) {
        if (error) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
    }
  });
};

exports.delete = function(user_id, callback) {
  User.deleteOne(
    {
      _id: user_id
    },
    function(error, user) {
      if (error) {
        callback(error);
      } else {
        callback(null, user);
      }
    }
  );
};

exports.checkCredentials = function(username, password_hash, callback) {
  User.findOne(
    {
      username: username,
      password_hash: password_hash,
      is_active: true
    },
    'app_permissions',
    function(error, user) {
      if (error) {
        callback(error);
      } else {
        callback(null, user);
      }
    }
  );
};
