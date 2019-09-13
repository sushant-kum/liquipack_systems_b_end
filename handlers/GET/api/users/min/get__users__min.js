const path = require('path');
const base_path = path.dirname(require.main.filename);

const logger = require(base_path + '/helpers/logger.helper.js');
const app_config = require(base_path + '/configs/apps.config');
const check_app_permission = require(base_path +
  '/helpers/check_app_permission.helper');
const UserController = require(base_path + '/controllers/user.controller.js');

exports.handler = function(req, res) {
  try {
    check_app_permission(
      app_config.app_names.users_min,
      app_config.permissions.read,
      req.user.username,
      function(error, is_permitted = null) {
        if (error) {
          logger.error(error, { log_to_console: true });
          return res.status(500).json({
            status: 'error',
            message: error,
            user_id: req.user._id,
            token: req.user.token
          });
        } else {
          if (is_permitted) {
            UserController.index(function(error, users = []) {
              if (error) {
                return res.status(500).json({
                  status: 'error',
                  message: error,
                  user_id: req.user._id,
                  token: req.user.token
                });
              } else {
                const users_min_data = [];
                for (const user of users) {
                  users_min_data.push({
                    _id: user._id,
                    username: user.username,
                    name: user.name
                  });
                }

                return res.json({
                  status: 'success',
                  message: 'Users min data retrieved successfully',
                  data: users_min_data,
                  user_id: req.user._id,
                  token: req.user.token
                });
              }
            });
          } else {
            return res.status(403).json({
              status: 'access_denied',
              message: 'Access to this operation is denied',
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
      status: 'error',
      message: error,
      user_id: req.user._id,
      token: req.user.token
    });
  }
};
