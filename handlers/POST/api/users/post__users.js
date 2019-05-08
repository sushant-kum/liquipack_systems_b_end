let path = require('path');
const base_path = path.dirname(require.main.filename);

let logger = require(base_path + "/helpers/logger.helper.js");
let app_config = require(base_path + "/configs/apps.config");
let check_app_permission = require(base_path + '/helpers/check_app_permission.helper');
let UserController = require(base_path + "/controllers/user.controller.js");

exports.handler = function (req, res) {
    try {
        check_app_permission(app_config.app_names.system_users, app_config.permissions.write, req.user.username, function (error, is_permitted = null) {
            if (error) {
                logger.error(error, { log_to_console: true });
                return res.status(500).json({
                    status: "error",
                    message: error,
                    user_id: req.user._id,
                    token: req.user.token
                });
            }
            else {
                if (is_permitted) {
                    let valid_arguments_flag = false;
                    try {
                        if (
                            req.body.username &&
                            req.body.password_hash &&
                            Array.isArray(JSON.parse(req.body.app_permissions)) &&
                            req.body.name &&
                            req.body.email &&
                            (req.body.gender ? (req.body.gender.toLowerCase() == "male" || req.body.gender.toLowerCase() == "female") : true)
                        )
                            valid_arguments_flag = true;
                    } catch (e) {
                        logger.error(e);
                    }

                    if (valid_arguments_flag) {
                        let app_permissions = JSON.parse(req.body.app_permissions);
                        let new_user = {
                            username: req.body.username,
                            password_hash: req.body.password_hash,
                            app_permissions: app_permissions,
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone ? req.body.phone : null,
                            gender: (req.body.gender.toLowerCase() == "male" || req.body.gender.toLowerCase() == "female") ? req.body.gender.toLowerCase() : null
                        };

                        UserController.new(new_user, function (error, user = null) {
                            if (error) {
                                return res.status(500).json({
                                    status: "error",
                                    message: error,
                                    user_id: req.user._id,
                                    token: req.user.token
                                });
                            }
                            else {
                                return res.json({
                                    status: "success",
                                    message: "User created successfully",
                                    data: user,
                                    user_id: req.user._id,
                                    token: req.user.token
                                });
                            }
                        });
                    }
                    else {
                        return res.status(400).json({
                            status: "error",
                            message: "Invalid arguments.",
                            user_id: req.user._id,
                            token: req.user.token
                        });
                    }
                }
                else {
                    return res.status(403).json({
                        status: "access_denied",
                        message: "Access to this operation is denied",
                        user_id: req.user._id,
                        token: req.user.token
                    });
                }
            }
        });
    }
    catch (error) {
        logger.error(error, { log_to_console: true });
        return res.status(500).json({
            status: "error",
            message: error,
            user_id: req.user._id,
            token: req.user.token
        });
    }
};