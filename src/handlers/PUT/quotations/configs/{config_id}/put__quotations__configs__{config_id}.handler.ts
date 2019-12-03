import * as logger from '@app/helpers/logger.helper';
import { AppNames, AppPermissions } from '@app/configs/apps.config';
import { checkAppPermission } from '@app/helpers/check_app_permission.helper';
import * as QuotationConfigController from '@app/controllers/apps-quotation-config.controller';
import { Response } from 'express';

export function handler(req: any, res: Response): Response {
  try {
    checkAppPermission(
      AppNames.apps_quotation_config,
      AppPermissions.write,
      req.user.username,
      (error, is_permitted) => {
        if (error) {
          logger.error([error], { log_to_console: true });
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
                req.params.config_id &&
                req.body.speed &&
                req.body.speed.options &&
                Array.isArray(req.body.speed.options) &&
                req.body.no_of_washes &&
                req.body.no_of_washes.options &&
                Array.isArray(req.body.no_of_washes.options) &&
                req.body.industry &&
                req.body.industry.options &&
                Array.isArray(req.body.industry.options) &&
                req.body.gmp_requirement &&
                req.body.gmp_requirement.options &&
                Array.isArray(req.body.gmp_requirement.options) &&
                req.body.bottle_moc &&
                req.body.bottle_moc.options &&
                Array.isArray(req.body.bottle_moc.options) &&
                req.body.water_saving &&
                req.body.water_saving.options &&
                Array.isArray(req.body.water_saving.options) &&
                req.body.filters_required &&
                req.body.filters_required.options &&
                Array.isArray(req.body.filters_required.options) &&
                req.body.illumination_required &&
                req.body.illumination_required.options &&
                Array.isArray(req.body.illumination_required.options) &&
                req.body.auto_level_tank &&
                req.body.auto_level_tank.options &&
                Array.isArray(req.body.auto_level_tank.options) &&
                req.body.extra_cups_sets &&
                req.body.extra_cups_sets.options &&
                Array.isArray(req.body.extra_cups_sets.options)
              ) {
                valid_arguments_flag = true;
              }
            } catch (e) {
              logger.error([e]);
            }

            if (valid_arguments_flag) {
              const update_quotation_config = {
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

              QuotationConfigController.update(
                req.params.config_id,
                update_quotation_config,
                (errorQuotationConfigControllerupdate, quotation_config) => {
                  if (errorQuotationConfigControllerupdate) {
                    return res.status(500).json({
                      status: 'error',
                      message: errorQuotationConfigControllerupdate,
                      user_id: req.user._id,
                      token: req.user.token
                    });
                  } else {
                    return res.json({
                      status: 'success',
                      message: 'Quotation config info updated successfully',
                      data: quotation_config,
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
    logger.error([error], { log_to_console: true });
    return res.status(500).json({
      status: 'error',
      message: error,
      user_id: req.user._id,
      token: req.user.token
    });
  }
}
