const config = {
  hostname: "sushantk.com",
  port: "27017",
  db_name: "liquipack_systems",
  username: "liquipack_systems_user",
  password: "NzFne2LMUXmjqad9bcyXcZHyLpHjUp"
};

exports.config = config;
exports.connection_string =
  "mongodb://" +
  config.username +
  ":" +
  config.password +
  "@" +
  config.hostname +
  ":" +
  config.port +
  "/" +
  config.db_name;
