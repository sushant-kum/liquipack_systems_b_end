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
            if (req.params.config_id) {
              valid_arguments_flag = true;
            }

            if (valid_arguments_flag) {
              QuotationConfigController.make_active(
                req.params.config_id,
                (errorQuotationConfigControllermake_active, quotation_config) => {
                  if (errorQuotationConfigControllermake_active) {
                    return res.status(500).json({
                      status: 'error',
                      message: errorQuotationConfigControllermake_active,
                      user_id: req.user._id,
                      token: req.user.token
                    });
                  } else {
                    return res.json({
                      status: 'success',
                      message: 'Quotation made active',
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
