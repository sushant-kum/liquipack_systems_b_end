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
                    if (
                        req.params.user_id &&
                        (req.body.delete_permanently ? (req.body.delete_permanently == "true" || req.body.delete_permanently == "false") : true)
                    )
                        valid_arguments_flag = true;

                    if (valid_arguments_flag) {
                        if (req.body.delete_permanently && req.body.delete_permanently == "true") {
                            UserController.delete(req.params.user_id, function (error, user = null) {
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
                                        message: "User deleted permanently",
                                        data: user,
                                        user_id: req.user._id,
                                        token: req.user.token
                                    });
                                }
                            });
                        }
                        else {
                            UserController.make_inactive(req.params.user_id, function (error, user = null) {
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
                                        message: "User made inactive",
                                        data: user,
                                        user_id: req.user._id,
                                        token: req.user.token
                                    });
                                }
                            });
                        }
                    }
                    else {
                        return res.status(400).json({
                            status: "invalid_request",
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