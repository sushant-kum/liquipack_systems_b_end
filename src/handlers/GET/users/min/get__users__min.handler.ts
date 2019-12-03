import * as logger from '@app/helpers/logger.helper';
import { AppNames, AppPermissions } from '@app/configs/apps.config';
import { checkAppPermission } from '@app/helpers/check_app_permission.helper';
import * as UserController from '@app/controllers/user.controller';
import { Response } from 'express';

export function handler(req: any, res: Response): Response {
  try {
    checkAppPermission(AppNames.users_min, AppPermissions.read, req.user.username, (error, is_permitted) => {
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
          UserController.index((errorUserControllerindex, users = []) => {
            if (errorUserControllerindex) {
              return res.status(500).json({
                status: 'error',
                message: errorUserControllerindex,
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
