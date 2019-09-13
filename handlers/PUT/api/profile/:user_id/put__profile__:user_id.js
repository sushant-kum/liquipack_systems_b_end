const path = require("path");
const base_path = path.dirname(require.main.filename);

const logger = require(base_path + "/helpers/logger.helper.js");
const app_config = require(base_path + "/configs/apps.config");
const check_app_permission = require(base_path +
  "/helpers/check_app_permission.helper");
const UserController = require(base_path + "/controllers/user.controller.js");

exports.handler = function(req, res) {
  try {
    check_app_permission(
      app_config.app_names.settings_profile,
      app_config.permissions.read,
      req.user.username,
      function(error, is_permitted = null) {
        if (error) {
          logger.error(error, { log_to_console: true });
          return res.status(500).json({
            status: "error",
            message: error,
            user_id: req.user._id,
            token: req.user.token
          });
        } else {
          if (is_permitted) {
            let valid_arguments_flag = false;
            try {
              if (
                req.params.user_id &&
                req.body.password_hash &&
                req.body.name &&
                req.body.email &&
                (req.body.gender
                  ? req.body.gender.toLowerCase() == "male" ||
                    req.body.gender.toLowerCase() == "female" ||
                    req.body.gender.toLowerCase() == "others"
                  : true)
              ) {
                valid_arguments_flag = true;
              }
            } catch (e) {
              logger.error(e);
            }

            if (valid_arguments_flag) {
              if (req.params.user_id == req.user._id) {
                UserController.view(req.user._id, function(error, user) {
                  if (error) {
                    logger.error(error, { log_to_console: true });
                    return res.status(500).json({
                      status: "error",
                      message: error,
                      user_id: req.user._id,
                      token: req.user.token
                    });
                  } else {
                    const update_user = {
                      password_hash: req.body.password_hash,
                      name: req.body.name,
                      email: req.body.email,
                      phone: req.body.phone ? req.body.phone : null,
                      gender: req.body.gender
                        ? req.body.gender.toLowerCase()
                        : null,
                      app_permissions: user.app_permissions
                    };

                    UserController.update(
                      req.params.user_id,
                      update_user,
                      function(error, user = null) {
                        if (error) {
                          return res.status(500).json({
                            status: "error",
                            message: error,
                            user_id: req.user._id,
                            token: req.user.token
                          });
                        } else {
                          return res.json({
                            status: "success",
                            message: "User profile updated successfully",
                            data: user,
                            user_id: req.user._id,
                            token: req.user.token
                          });
                        }
                      }
                    );
                  }
                });
              } else {
                return res.status(403).json({
                  status: "access_denied",
                  message: "Access to this operation is denied",
                  user_id: req.user._id,
                  token: req.user.token
                });
              }
            } else {
              return res.status(400).json({
                status: "invalid_request",
                message: "Invalid arguments.",
                user_id: req.user._id,
                token: req.user.token
              });
            }
          } else {
            return res.status(403).json({
              status: "access_denied",
              message: "Access to this operation is denied",
              user_id: req.user._id,
              token: req.user.token
            });
          }
        }
      }
    );
  } catch (error) {
    logger.error(error, { log_to_console: true });
    return res.status(500).json({
      status: "error",
      message: error,
      user_id: req.user._id,
      token: req.user.token
    });
  }
};
