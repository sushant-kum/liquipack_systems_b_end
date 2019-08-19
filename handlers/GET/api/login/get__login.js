let jwt = require("jsonwebtoken");
let path = require('path');
let uuidv4 = require('uuid/v4');
const base_path = path.dirname(require.main.filename);

let UserController = require(base_path + "/controllers/user.controller.js");
let TokenController = require(base_path + "/controllers/token.controller.js");
let logger = require(base_path + "/helpers/logger.helper.js");
let jwt_config = require(base_path + "/configs/jwt.config");
let app_config = require(base_path + "/configs/apps.config");
let check_app_permission = require(base_path + '/helpers/check_app_permission.helper');


exports.handler = function (req, res) {
  try {
    check_app_permission(app_config.app_names.login, app_config.permissions.read, req.user.username, function (error, is_permitted = null) {
      if (error) {
        logger.error(error, { log_to_console: true });
        return res.status(500).json({
          status: "error",
          message: error,
          user_id: req.user._id,
          token: req.user.token
        });
      }
      else {
        if (is_permitted) {
          const uuid = uuidv4();
          const jwt_payload = {
            username: req.user.username,
            uuid: uuid
          }
          const token = jwt.sign(jwt_payload, jwt_config.token_secret, { expiresIn: jwt_config.token_life });
          let new_token = {
            username: req.user.username,
            token: token,
            uuid: uuid
          };
          TokenController.new(new_token, function (error, token = null) {
            if (error) {
              logger.error(error, { log_to_console: true });
              return res.status(500).json({
                status: "error",
                message: error,
                user_id: req.user._id,
                token: req.user.token
              });
            }
            else {
              return res.json({
                status: "success",
                message: "Login Successful",
                data: {
                  app_permissions: req.user.app_permissions
                },
                user_id: req.user._id,
                token: new_token.token
              });
            }
          });
          // return res.json({
          //     status: "success",
          //     message: "Login Successful",
          //     data: {
          //         user_id: req.user._id,
          //         app_permissions: req.user.app_permissions
          //     },
          //     token: token
          // });
        }
        else {
          return res.status(403).json({
            status: "access_denied",
            message: "Access to this operation is denied",
            user_id: req.user._id,
            token: req.user.token
          });
        }
      }
    });
  }
  catch (error) {
    logger.error(error, { log_to_console: true });
    return res.status(500).json({
      status: "error",
      message: error,
      user_id: req.user._id,
      token: req.user.token
    });
  }
};