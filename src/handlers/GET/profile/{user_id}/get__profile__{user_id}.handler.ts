import * as logger from '@app/helpers/logger.helper';
import { AppNames, AppPermissions } from '@app/configs/apps.config';
import { checkAppPermission } from '@app/helpers/check_app_permission.helper';
import * as UserController from '@app/controllers/user.controller';
import { Response } from 'express';

export function handler(req: any, res: Response): Response {
  try {
    checkAppPermission(AppNames.settings_profile, AppPermissions.read, req.user.username, (error, is_permitted) => {
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
          if (req.params.user_id) {
            valid_arguments_flag = true;
          }

          if (valid_arguments_flag) {
            if (req.params.user_id === req.user._id.toString()) {
              UserController.view(req.params.user_id, (errorUserControllerview, user = null) => {
                if (errorUserControllerview) {
                  logger.error([error], { log_to_console: true });
                  return res.status(500).json({
                    status: 'error',
                    message: errorUserControllerview,
                    user_id: req.user._id,
                    token: req.user.token
                  });
                } else {
                  return res.json({
                    status: 'success',
                    message: 'Profile retrieved successfully',
                    data: user,
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
            message: 'Access to this operation is denied...',
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
