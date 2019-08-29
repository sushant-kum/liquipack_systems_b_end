let path = require('path');
const base_path = path.dirname(require.main.filename);

let logger = require(base_path + "/helpers/logger.helper.js");
let app_config = require(base_path + "/configs/apps.config");
let check_app_permission = require(base_path + '/helpers/check_app_permission.helper');
let QuotationConfigController = require(base_path + "/controllers/apps-quotation-config.controller.js");

exports.handler = function (req, res) {
  try {
    check_app_permission(app_config.app_names.apps_quotation_config, app_config.permissions.write, req.user.username, function (error, is_permitted = null) {
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
          let valid_arguments_flag = false;
          try {
            if (
              req.params.config_id &&
              req.body.speed && (
                req.body.speed.options &&
                Array.isArray(req.body.speed.options)
              ) &&
              req.body.no_of_washes && (
                req.body.no_of_washes.options &&
                Array.isArray(req.body.no_of_washes.options)
              ) &&
              req.body.industry && (
                req.body.industry.options &&
                Array.isArray(req.body.industry.options)
              ) &&
              req.body.gmp_requirement && (
                req.body.gmp_requirement.options &&
                Array.isArray(req.body.gmp_requirement.options)
              ) &&
              req.body.bottle_moc && (
                req.body.bottle_moc.options &&
                Array.isArray(req.body.bottle_moc.options)
              ) &&
              req.body.water_saving && (
                req.body.water_saving.options &&
                Array.isArray(req.body.water_saving.options)
              ) &&
              req.body.filters_required && (
                req.body.filters_required.options &&
                Array.isArray(req.body.filters_required.options)
              ) &&
              req.body.illumination_required && (
                req.body.illumination_required.options &&
                Array.isArray(req.body.illumination_required.options)
              ) &&
              req.body.auto_level_tank && (
                req.body.auto_level_tank.options &&
                Array.isArray(req.body.auto_level_tank.options)
              ) &&
              req.body.extra_cups_sets && (
                req.body.extra_cups_sets.options &&
                Array.isArray(req.body.extra_cups_sets.options)
              )
            )
              valid_arguments_flag = true;
          } catch (e) {
            logger.error(e);
          }

          if (valid_arguments_flag) {
            let update_quotation_config = {
              speed: req.body.speed,
              no_of_washes: req.body.no_of_washes,
              industry: req.body.industry,
              gmp_requirement: req.body.gmp_requirement,
              bottle_moc: req.body.bottle_moc,
              water_saving: req.body.water_saving,
              filters_required: req.body.filters_required,
              illumination_required: req.body.illumination_required,
              auto_level_tank: req.body.auto_level_tank,
              extra_cups_sets: req.body.extra_cups_sets
            };

            QuotationConfigController.update(req.params.config_id, update_quotation_config, function (error, quotation_config = null) {
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
                  message: "Quotation config info updated successfully",
                  data: quotation_config,
                  user_id: req.user._id,
                  token: req.user.token
                });
              }
            });
          }
          else {
            return res.status(400).json({
              status: "invalid_request",
              message: "Invalid arguments.",
              user_id: req.user._id,
              token: req.user.token
            });
          }
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