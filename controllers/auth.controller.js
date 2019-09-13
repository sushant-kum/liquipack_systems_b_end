const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const BasicStrategy = require("passport-http").BasicStrategy;
const DigestStrategy = require("passport-http").DigestStrategy;
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");
const path = require("path");

const base_path = path.dirname(require.main.filename);

const UserController = require(base_path + "/controllers/user.controller.js");
const TokenController = require(base_path + "/controllers/token.controller.js");
const jwt_config = require(base_path + "/configs/jwt.config");

class AuthError extends Error {
  constructor(msg = "Unauthorized", status = 401) {
    super(msg);
    this.status = status;
  }
}

// Basic Auth
passport.use(
  new BasicStrategy(function(username, password_hash, callback) {
    UserController.findOne(
      { username: username, password_hash: password_hash, is_active: true },
      function(error, user) {
        if (error) {
          return callback(error);
        }

        // No user found with that username
        if (!user) {
          return callback(new AuthError());
        }

        return callback(null, user);
      }
    );
  })
);

// Digest Auth
// passport.use(new DigestStrategy(
//     { qop: 'auth' },
//     function (username, callback) {
//         UserController.findOne({ username: username, is_active: true }, function (error, user) {
//             if (error) { return callback(error); }

//             // No user found with that username
//             if (!user) {
//                 return callback(new AuthError());
//             }

//             // Success
//             return callback(null, user, user.password_hash);
//         });
//     },
//     function (params, callback) {
//         // validate nonces as necessary
//         callback(null, true);
//     }
// ));

// JWT Based Bearer TokenAuth
const jwt_opts = {};
jwt_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwt_opts.secretOrKey = jwt_config.token_secret;
jwt_opts.issuer = jwt_config.issuer;
jwt_opts.audience = jwt_config.audience;
passport.use(
  new JwtStrategy(jwt_opts, function(jwt_payload, callback) {
    UserController.findOne(
      {
        username: jwt_payload.username,
        is_active: true
      },
      function(error, user) {
        if (error) {
          return callback(error, false);
        }
        if (user) {
          TokenController.findOne(
            {
              username: jwt_payload.username,
              uuid: jwt_payload.uuid,
              is_active: true
            },
            function(error, token_record) {
              if (error) {
                return callback(error, false);
              }
              if (token_record) {
                if (token_record.uuid == jwt_payload.uuid) {
                  const uuid = uuidv4();
                  const new_token = jwt.sign(
                    { username: user.username, uuid: uuid },
                    jwt_config.token_secret,
                    { expiresIn: jwt_config.token_life }
                  );
                  TokenController.update(
                    token_record._id,
                    {
                      token: new_token,
                      uuid: uuid
                    },
                    function(error, new_token_record) {
                      if (error) {
                        console.error(error);
                        return callback(error, false);
                      } else {
                        user.token = new_token;
                        return callback(null, user);
                      }
                    }
                  );
                } else {
                  return callback(new AuthError());
                }
              } else {
                return callback(new AuthError());
              }
            }
          );
        } else {
          return callback(new AuthError());
        }
      }
    );
  })
);

exports.isBasicAuthenticated = passport.authenticate("basic", {
  session: false
});
// exports.isDigestAuthenticated = passport.authenticate('digest', { session: false });
exports.isJWTAuthenticated = passport.authenticate("jwt", { session: false });
