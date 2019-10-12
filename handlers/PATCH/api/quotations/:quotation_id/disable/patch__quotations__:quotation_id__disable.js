const path = require('path');
const base_path = path.dirname(require.main.filename);

const logger = require(base_path + '/helpers/logger.helper.js');
const app_config = require(base_path + '/configs/apps.config');
const check_app_permission = require(base_path +
  '/helpers/check_app_permission.helper');
const QuotationController = require(base_path +
  '/controllers/apps-quotation.controller.js');

exports.handler = function(req, res) {
  try {
    check_app_permission(
      app_config.app_names.apps_quotation,
      app_config.permissions.write,
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
            let valid_arguments_flag = false;
            if (req.params.quotation_id) valid_arguments_flag = true;

            if (valid_arguments_flag) {
              QuotationController.make_inactive(
                req.params.quotation_id,
                function(error, quotation = null) {
                  if (error) {
                    return res.status(500).json({
                      status: 'error',
                      message: error,
                      user_id: req.user._id,
                      token: req.user.token
                    });
                  } else {
                    return res.json({
                      status: 'success',
                      message: 'Quotation made inactive',
                      data: quotation,
                      user_id: req.user._id,
                      token: req.user.token
                    });
                  }
                }
              );
            } else {
              return res.status(400).json({
                status: 'invalid_request',
                message: 'Invalid arguments.',
                user_id: req.user._id,
                token: req.user.token
              });
            }
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
