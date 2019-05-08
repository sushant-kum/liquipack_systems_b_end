let app_names = {
    login: "login",
    token: "token",
    system_users: "system-users"
};
let permissions = {
    read: "read",
    write: "write",
};
let compulsory_app_permissions = {};
compulsory_app_permissions[app_names.login] = [permissions.read, permissions.write];
compulsory_app_permissions[app_names.token] = [permissions.read, permissions.write];

exports.app_names = app_names;
exports.permissions = permissions;
exports.compulsory_apps = [
    app_names.login,
    app_names.token
];
exports.compulsory_app_permissions = compulsory_app_permissions;