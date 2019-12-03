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
              req.body.username &&
              req.body.password_hash &&
              Array.isArray(req.body.app_permissions) &&
              req.body.name &&
              req.body.email &&
              (req.body.gender.toLowerCase() === 'male' ||
                req.body.gender.toLowerCase() === 'female' ||
                req.body.gender.toLowerCase() === 'others')
            ) {
              valid_arguments_flag = true;
            }
          } catch (e) {
            logger.error([e]);
          }

          if (valid_arguments_flag) {
            const app_permissions = req.body.app_permissions;
            const new_user = {
              username: req.body.username,
              password_hash: req.body.password_hash,
              app_permissions,
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone ? req.body.phone : null,
              gender: req.body.gender.toLowerCase()
            };

            UserController.create(new_user, (errorUserControllercreate, user) => {
              if (errorUserControllercreate) {
                return res.status(500).json({
                  status: 'error',
                  message: errorUserControllercreate,
                  user_id: req.user._id,
                  token: req.user.token
                });
              } else {
                return res.json({
                  status: 'success',
                  message: 'User created successfully',
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
