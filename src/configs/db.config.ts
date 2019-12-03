export const config = {
  hostname: 'liquipack-ta1ux.mongodb.net',
  db_name: 'liquipack_systems',
  username: 'liquipack_systems_user',
  password: 'NzFne2LMUXmjqad9bcyXcZHyLpHjUp',
  options: 'retryWrites=true&w=majority'
};

export const connection_string = `mongodb+srv://${config.username}:${config.password}@${config.hostname}/${config.db_name}?${config.options}`;
