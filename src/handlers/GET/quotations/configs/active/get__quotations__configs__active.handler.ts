import * as logger from '@app/helpers/logger.helper';
import { AppNames, AppPermissions } from '@app/configs/apps.config';
import { checkAppPermission } from '@app/helpers/check_app_permission.helper';
import * as QuotationConfigController from '@app/controllers/apps-quotation-config.controller';
import { Response } from 'express';

export function handler(req: any, res: Response): Response {
  try {
    checkAppPermission(AppNames.apps_quotation, AppPermissions.write, req.user.username, (error, is_permitted) => {
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
          QuotationConfigController.findOne(
            { is_active: true },
            (errorQuotationConfigControllerfindOne, quotation_config) => {
              if (errorQuotationConfigControllerfindOne) {
                return res.status(500).json({
                  status: 'error',
                  message: errorQuotationConfigControllerfindOne,
                  user_id: req.user._id,
                  token: req.user.token
                });
              } else {
                return res.json({
                  status: 'success',
                  message: 'Active Quotation Config retrieved successfully',
                  data: quotation_config,
                  user_id: req.user._id,
                  token: req.user.token
                });
              }
            }
          );
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
    logger.error([error], { log_to_console: true });
    return res.status(500).json({
      status: 'error',
      message: error,
      user_id: req.user._id,
      token: req.user.token
    });
  }
}
