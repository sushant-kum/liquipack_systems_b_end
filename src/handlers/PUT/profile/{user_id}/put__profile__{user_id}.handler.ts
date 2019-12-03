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
          try {
            if (
              req.params.user_id &&
              req.body.password_hash &&
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
            if (req.params.user_id === req.user._id.toString()) {
              UserController.view(req.user._id, (errorUserControllerview, user) => {
                if (errorUserControllerview || !user) {
                  logger.error([errorUserControllerview], { log_to_console: true });
                  return res.status(500).json({
                    status: 'error',
                    message: errorUserControllerview,
                    user_id: req.user._id,
                    token: req.user.token
                  });
                } else {
                  const update_user = {
                    password_hash: req.body.password_hash,
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone ? req.body.phone : null,
                    gender: req.body.gender ? req.body.gender.toLowerCase() : null,
                    app_permissions: user.app_permissions
                  };

                  UserController.update(
                    req.params.user_id,
                    update_user,
                    (errorUserControllerupdate, userUserControllerupdate) => {
                      if (errorUserControllerupdate) {
                        logger.error([errorUserControllerupdate], { log_to_console: true });
                        return res.status(500).json({
                          status: 'error',
                          message: errorUserControllerupdate,
                          user_id: req.user._id,
                          token: req.user.token
                        });
                      } else {
                        return res.json({
                          status: 'success',
                          message: 'User profile updated successfully',
                          data: userUserControllerupdate,
                          user_id: req.user._id,
                          token: req.user.token
                        });
                      }
                    }
                  );
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
