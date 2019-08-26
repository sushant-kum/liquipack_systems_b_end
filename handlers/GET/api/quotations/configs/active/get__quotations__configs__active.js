let path = require('path');
const base_path = path.dirname(require.main.filename);

let logger = require(base_path + "/helpers/logger.helper.js");
let app_config = require(base_path + "/configs/apps.config");
let check_app_permission = require(base_path + '/helpers/check_app_permission.helper');
let QuotationConfigController = require(base_path + "/controllers/apps-quotation-config.controller.js");

exports.handler = function (req, res) {
  try {
    check_app_permission(app_config.app_names.apps_quotation_config, app_config.permissions.read, req.user.username, function (error, is_permitted = null) {
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
          QuotationConfigController.findOne({is_active: true}, function (error, quotation_config = null) {
            if (error) {
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
                message: "Active Quotation Config retrieved successfully",
                data: quotation_config,
                user_id: req.user._id,
                token: req.user.token
              });
            }
          });
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