let path = require('path');
const base_path = path.dirname(require.main.filename);

let UserController = require(base_path + "/controllers/user.controller.js");
let app_config = require(base_path + "/configs/apps.config");

module.exports = function (app_name, permission, username, callback) {
  try {
    if (app_config.compulsory_apps.indexOf(app_name) >= 0 && app_config.compulsory_app_permissions[app_name].indexOf(permission) >= 0)
      return callback(null, true);
    else {
      UserController.findOne({
        username: username,
        is_active: true
      }, function (error, user) {
        if (error)
          return callback(error);
        else {
          // user.app_permissions.forEach(app_permission => {
          //     if (app_permission.app == app_name && app_permission.permissions.indexOf(permission) >= 0) {
          //         console.log("asd");
          //         return callback(null, true);
          //     }
          // });
          for (let i = 0; i < user.app_permissions.length; i++) {
            if (user.app_permissions[i].app == app_name && user.app_permissions[i].permissions.indexOf(permission) >= 0) {
              return callback(null, true);
            }
          }
          return callback(null, false);
        }
      });
    }

  }
  catch (error) {
    return callback(error);
  }
}