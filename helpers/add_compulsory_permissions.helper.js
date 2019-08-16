let path = require('path');
const base_path = path.dirname(require.main.filename);

let logger = require(base_path + "/helpers/logger.helper.js");
let app_config = require(base_path + "/configs/apps.config");

module.exports = function (app_permissions) {
    if (app_permissions.length > 0) {
        for (let i = app_permissions.length; i >= 0; i--) {
            if (app_config.compulsory_apps.indexOf(app_permissions[i].app) >= 0) {
                app_permissions.splice(i, 1);
            }
        }
    }
    for (let compulsory_app of app_config.compulsory_apps) {
        app_permissions.unshift({
            app: compulsory_app,
            permissions: app_config.compulsory_app_permissions[compulsory_app]
        });
    }
    return app_permissions;
};