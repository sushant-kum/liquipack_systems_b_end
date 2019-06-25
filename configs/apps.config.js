let app_names = {
    login: "login",
    token: "token",
    system_users: "system-users",
    settings_profile: "settings-profile"
};
let permissions = {
    read: "read",
    write: "write",
};
let compulsory_app_permissions = {};
compulsory_app_permissions[app_names.login] = [permissions.read, permissions.write];
compulsory_app_permissions[app_names.token] = [permissions.read, permissions.write];
compulsory_app_permissions[app_names.settings_profile] = [permissions.read, permissions.write];

exports.app_names = app_names;
exports.permissions = permissions;
exports.compulsory_apps = [
    app_names.login,
    app_names.token,
    app_names.settings_profile
];
exports.compulsory_app_permissions = compulsory_app_permissions;