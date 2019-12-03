import * as UserController from '@app/controllers/user.controller';
import { AppNames, AppPermissions, compulsory_apps, compulsory_app_permissions } from '@app/configs/apps.config';
import { MongooseDocumentSchema } from '@app/models/mongoose-db/user.model';

export function checkAppPermission(
  app_name: AppNames,
  permission: AppPermissions,
  username: string,
  callback: (err: any, is_permitted?: boolean) => void
): void {
  try {
    if (compulsory_apps.includes(app_name) && compulsory_app_permissions[app_name].includes(permission)) {
      return callback(null, true);
    } else {
      UserController.findOne(
        {
          username,
          is_active: true
        },
        (error, user: MongooseDocumentSchema | undefined) => {
          if (error) {
            return callback(error);
          } else {
            if (user) {
              for (const app_permission of user.app_permissions) {
                if (app_permission.app === app_name && app_permission.permissions.includes(permission)) {
                  return callback(null, true);
                }
              }
              return callback(null, false);
            } else {
              return new Error('User not found');
            }
          }
        }
      );
    }
  } catch (error) {
    return callback(error);
  }
}
