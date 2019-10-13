const path = require('path');
const base_path = path.dirname(require.main.filename);

const logger = require(base_path + '/helpers/logger.helper.js');
const app_config = require(base_path + '/configs/apps.config');
const check_app_permission = require(base_path + '/helpers/check_app_permission.helper');
const QuotationController = require(base_path + '/controllers/apps-quotation.controller.js');

exports.handler = function(req, res) {
  try {
    check_app_permission(app_config.app_names.apps_quotation, app_config.permissions.write, req.user.username, function(
      error,
      is_permitted = null
    ) {
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
          try {
            if (
              req.body.quotation_num &&
              req.body.speed &&
              (req.body.speed.qty !== undefined && req.body.speed.price !== undefined) &&
              req.body.no_of_washes &&
              (req.body.no_of_washes.qty !== undefined && req.body.no_of_washes.price !== undefined) &&
              req.body.industry &&
              (req.body.industry.qty !== undefined && req.body.industry.price !== undefined) &&
              req.body.gmp_requirement &&
              (req.body.gmp_requirement.qty !== undefined && req.body.gmp_requirement.price !== undefined) &&
              req.body.bottle_moc &&
              (req.body.bottle_moc.qty !== undefined && req.body.bottle_moc.price !== undefined) &&
              req.body.water_saving &&
              (req.body.water_saving.qty !== undefined && req.body.water_saving.price !== undefined) &&
              req.body.filters_required &&
              (req.body.filters_required.qty !== undefined && req.body.filters_required.price !== undefined) &&
              req.body.illumination_required &&
              (req.body.illumination_required.qty !== undefined &&
                req.body.illumination_required.price !== undefined) &&
              req.body.auto_level_tank &&
              (req.body.auto_level_tank.qty !== undefined && req.body.auto_level_tank.price !== undefined) &&
              req.body.extra_cups_sets &&
              (req.body.extra_cups_sets.qty !== undefined && req.body.extra_cups_sets.price !== undefined) &&
              req.body.customer_details &&
              (req.body.customer_details.name &&
                req.body.customer_details.address &&
                req.body.customer_details.person_of_contact &&
                (req.body.customer_details.person_of_contact.title &&
                  req.body.customer_details.person_of_contact.name) &&
                req.body.customer_details.contact_no)
            ) {
              valid_arguments_flag = true;
            }
          } catch (e) {
            logger.error(e);
          }

          if (valid_arguments_flag) {
            const new_quotation = {
              quotation_num: req.body.quotation_num,
              speed: req.body.speed,
              no_of_washes: req.body.no_of_washes,
              industry: req.body.industry,
              gmp_requirement: req.body.gmp_requirement,
              bottle_moc: req.body.bottle_moc,
              water_saving: req.body.water_saving,
              filters_required: req.body.filters_required,
              illumination_required: req.body.illumination_required,
              auto_level_tank: req.body.auto_level_tank,
              extra_cups_sets: req.body.extra_cups_sets,
              other_details: req.body.other_details ? req.body.other_details : null,
              customer_details: req.body.customer_details,
              created_by: req.user._id
            };

            QuotationController.new(new_quotation, function(error, quotation = null) {
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
                  message: 'Quotation created successfully',
                  data: quotation,
                  user_id: req.user._id,
                  token: req.user.token
                });
              }
            });
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
    });
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
