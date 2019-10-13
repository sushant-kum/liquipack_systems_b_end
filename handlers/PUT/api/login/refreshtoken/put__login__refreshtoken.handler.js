const jwt = require('jsonwebtoken');
const path = require('path');
const base_path = path.dirname(require.main.filename);

const TokenController = require(base_path + '/controllers/token.controller.js');
const logger = require(base_path + '/helpers/logger.helper.js');
const jwt_config = require(base_path + '/configs/jwt.config');
const app_config = require(base_path + '/configs/apps.config');
const check_app_permission = require(base_path + '/helpers/check_app_permission.helper');

exports.handler = function(req, res) {
  try {
    let valid_arguments_flag = false;
    if (req.body.username && req.body.refresh_token) {
      valid_arguments_flag = true;
    }
    if (valid_arguments_flag) {
      check_app_permission(app_config.app_names.token, app_config.permissions.write, req.body.username, function(
        error,
        is_permitted = null
      ) {
        if (error) {
          logger.error(error, { log_to_console: true });
          return res.status(500).json({
            status: 'error',
            message: error
          });
        } else {
          if (is_permitted) {
            const refresh_token = req.body.refresh_token;
            jwt.verify(refresh_token, jwt_config.refresh_token_secret, function(error, jwt_verify) {
              if (error) {
                if (error instanceof jwt.TokenExpiredError) {
                  TokenController.findOne(
                    {
                      username: req.body.username,
                      refresh_token: req.body.refresh_token,
                      is_active: true
                    },
                    function(err, token = null) {
                      if (err) {
                        logger.error(error, { log_to_console: true });
                        return res.status(500).json({
                          status: 'error',
                          message: error
                        });
                      } else if (token == null) {
                        return res.status(404).json({
                          status: 'not_found',
                          message: 'Refresh token not found.'
                        });
                      } else {
                        TokenController.delete(token._id, function(error, token = null) {
                          if (err) {
                            logger.error(error, { log_to_console: true });
                            return res.status(500).json({
                              status: 'error',
                              message: error
                            });
                          } else {
                            return res.status(401).json({
                              status: 'unauthorized',
                              message: 'Refresh token expired'
                            });
                          }
                        });
                      }
                    }
                  );
                }
              } else {
                if (jwt_verify.username == req.body.username) {
                  TokenController.findOne(
                    {
                      username: req.body.username,
                      refresh_token: req.body.refresh_token,
                      is_active: true
                    },
                    function(err, token = null) {
                      if (err) {
                        logger.error(error, { log_to_console: true });
                        return res.status(500).json({
                          status: 'error',
                          message: error
                        });
                      } else if (token == null) {
                        return res.status(404).json({
                          status: 'not_found',
                          message: 'Refresh token not found.'
                        });
                      } else {
                        const new_token = jwt.sign({ username: req.body.username }, jwt_config.token_secret, {
                          expiresIn: jwt_config.token_life
                        });
                        const updated_token = token;
                        updated_token.token = new_token;
                        TokenController.update(token._id, updated_token, function(error, token) {
                          if (error) {
                            logger.error(error, { log_to_console: true });
                            return res.status(500).json({
                              status: 'error',
                              message: error
                            });
                          } else {
                            return res.json({
                              status: 'success',
                              message: 'Token refreshed',
                              token: new_token
                            });
                          }
                        });
                      }
                    }
                  );
                } else {
                  return res.status(401).json({
                    status: 'unauthorized',
                    message: 'Refresh token not mapped with username.'
                  });
                }
              }
            });
          } else {
            return res.status(403).json({
              status: 'access_denied',
              message: 'Access to this operation is denied'
            });
          }
        }
      });
    } else {
      return res.status(400).json({
        status: 'invalid_request',
        message: 'Invalid arguments'
      });
    }
  } catch (error) {
    logger.error(error, { log_to_console: true });
    return res.status(500).json({
      status: 'error',
      message: error
    });
  }
};
