export enum AppNames {
  login = 'login',
  token = 'token',
  system_users = 'system-users',
  settings_profile = 'settings-profile',
  users_min = 'users-min',
  apps = 'apps',
  apps_quotation = 'apps-quotation',
  apps_quotation_config = 'apps-quotation-config'
}

export enum AppPermissions {
  read = 'read',
  write = 'write'
}

export const compulsory_apps: AppNames[] = [
  AppNames.login,
  AppNames.token,
  AppNames.settings_profile,
  AppNames.users_min
];

export const compulsory_app_permissions: { [key: string]: AppPermissions[] } = {};
compulsory_app_permissions[AppNames.login] = [AppPermissions.read, AppPermissions.write];
compulsory_app_permissions[AppNames.token] = [AppPermissions.read, AppPermissions.write];
compulsory_app_permissions[AppNames.settings_profile] = [AppPermissions.read, AppPermissions.write];
compulsory_app_permissions[AppNames.users_min] = [AppPermissions.read];
