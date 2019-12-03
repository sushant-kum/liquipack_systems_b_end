import { sign as jwt__sign } from 'jsonwebtoken';
import * as uuidv4 from 'uuid/v4';

import * as TokenController from '@app/controllers/token.controller';
import * as logger from '@app/helpers/logger.helper';
import { jwt_config } from '@app/configs/jwt.config';
import { AppNames, AppPermissions } from '@app/configs/apps.config';
import { checkAppPermission } from '@app/helpers/check_app_permission.helper';
import { Response } from 'express';

export function handler(req: any, res: Response): Response {
  try {
    checkAppPermission(AppNames.login, AppPermissions.read, req.user.username, (error: any, is_permitted?: boolean) => {
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
          const uuid = uuidv4();
          const jwt_payload = {
            username: req.user.username,
            uuid
          };
          const token = jwt__sign(jwt_payload, jwt_config.token_secret, {
            expiresIn: jwt_config.token_life
          });
          const new_token = {
            username: req.user.username,
            token,
            uuid
          };
          TokenController.create(new_token, errorcreate => {
            if (errorcreate) {
              logger.error([errorcreate], { log_to_console: true });
              return res.status(500).json({
                status: 'error',
                message: errorcreate,
                user_id: req.user._id,
                token: req.user.token
              });
            } else {
              return res.json({
                status: 'success',
                message: 'Login Successful',
                data: {
                  app_permissions: req.user.app_permissions
                },
                user_id: req.user._id,
                token: new_token.token
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
