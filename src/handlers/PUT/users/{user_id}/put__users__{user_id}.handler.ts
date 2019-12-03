import * as logger from '@app/helpers/logger.helper';
import { AppNames, AppPermissions } from '@app/configs/apps.config';
import { checkAppPermission } from '@app/helpers/check_app_permission.helper';
import * as UserController from '@app/controllers/user.controller';
import { Response } from 'express';

export function handler(req: any, res: Response): Response {
  try {
    checkAppPermission(AppNames.system_users, AppPermissions.write, req.user.username, (error, is_permitted) => {
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
              req.params.user_id &&
              req.body.password_hash &&
              Array.isArray(req.body.app_permissions) &&
              req.body.name &&
              req.body.email &&
              (req.body.gender
                ? req.body.gender.toLowerCase() === 'male' ||
                  req.body.gender.toLowerCase() === 'female' ||
                  req.body.gender.toLowerCase() === 'others'
                : true)
            ) {
              valid_arguments_flag = true;
            }
          } catch (e) {
            logger.error([e]);
          }

          if (valid_arguments_flag) {
            const update_user = {
              password_hash: req.body.password_hash,
              app_permissions: req.body.app_permissions,
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone ? req.body.phone : null,
              gender: req.body.gender ? req.body.gender.toLowerCase() : null
            };

            UserController.update(req.params.user_id, update_user, (errorUserControllerupdate, user = null) => {
              if (errorUserControllerupdate) {
                return res.status(500).json({
                  status: 'error',
                  message: errorUserControllerupdate,
                  user_id: req.user._id,
                  token: req.user.token
                });
              } else {
                return res.json({
                  status: 'success',
                  message: 'User info updated successfully',
                  data: user,
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
    logger.error([error], { log_to_console: true });
    return res.status(500).json({
      status: 'error',
      message: error,
      user_id: req.user._id,
      token: req.user.token
    });
  }
}
