const path = require('path');
const base_path = path.dirname(require.main.filename);

Token = require(base_path + '/models/token.model');

exports.findOne = function(query, callback) {
  Token.findOne(query, function(error, token) {
    if (error) {
      callback(error);
    } else {
      callback(null, token);
    }
  });
};

exports.find = function(query, callback) {
  Token.find(query, function(error, tokens) {
    if (error) {
      callback(error);
    } else {
      callback(null, tokens);
    }
  });
};

exports.index = function(callback) {
  Token.get(function(error, tokens) {
    if (error) callback(error);
    else callback(null, tokens);
  });
};

exports.new = function(new_token, callback) {
  const token = new Token();
  token.username = new_token.username;
  token.token = new_token.token;
  token.uuid = new_token.uuid;
  token.save(function(error) {
    if (error) {
      callback(error);
    } else {
      callback(null, token);
    }
  });
};

// exports.view = function (user_id, callback) {
//     Token.findById(user_id, function (error, user) {
//         if (error) {
//             callback(error);
//         }
//         else {
//             callback(null, user);
//         }
//     });
// };

exports.update = function(token_id, updated_token, callback) {
  Token.findById(token_id, function(error, token) {
    if (error) {
      res.json({
        status: 'error',
        message: error
      });
    } else {
      token.token = updated_token.token;
      token.last_updated_timestamp = Date.now();
      token.uuid = updated_token.uuid;
      token.save(function(error) {
        if (error) {
          callback(error);
        } else {
          callback(null, token);
        }
      });
    }
  });
};

exports.make_inactive = function(token_id, callback) {
  Token.findById(token_id, function(error, token) {
    if (error) {
      callback(error);
    } else {
      token.is_active = false;
      token.save(function(error) {
        if (error) {
          callback(error);
        } else {
          callback(null, token);
        }
      });
    }
  });
};

exports.delete = function(token_id, callback) {
  Token.deleteOne(
    {
      _id: token_id
    },
    function(error, token) {
      if (error) {
        callback(error);
      } else {
        callback(null, token);
      }
    }
  );
};
