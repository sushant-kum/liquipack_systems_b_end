const express = require('express');
const body_parser = require('body-parser');
const multer = require('multer')();
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

const base_path = path.dirname(require.main.filename);

const api_router = require(base_path + '/routers/api.router');
const apidoc_router = require(base_path + '/routers/api-doc.router');
const db_connection = require(base_path + '/configs/db.config');
const logger = require(base_path + '/helpers/logger.helper');

const port = process.env.PORT || 8080;

mongoose.connect(db_connection.connection_string, {
  useCreateIndex: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', error => {
  logger.error(error);
  logger.error(
    'Error connecting to db_config:',
    db_connection.config,
    'connection_string: ',
    db_connection.connection_string
  );
});
db.on('connected', () => {
  logger.log('Connected to db_config:', db_connection.config, {
    log_to_console: true
  });
  const app = express();

  app.use(passport.initialize());

  // for parsing application/xwww-form-urlencoded
  app.use(
    body_parser.urlencoded({
      extended: true
    })
  );
  // for parsing application/json
  app.use(body_parser.json());
  // for parsing multipart/form-data
  app.use(multer.array());

  app.use('/assets', express.static('assets'));
  // app.get('/', (req, res) => res.send('liquipack_systems APIs'));
  app.use('/', api_router);
  app.use('/api-doc', apidoc_router);

  app.listen(port, function() {
    logger.log('Started liquipack_systems API service on port ' + port, {
      log_to_console: true
    });
  });
});
db.on('disconnected', () => {
  logger.error(
    'Disconnected from db_config:',
    db_connection.config,
    'connection_string: ',
    db_connection.connection_string,
    { log_to_console: true }
  );
});

process.on('SIGINT', function() {
  db.close(function() {
    logger.error(
      'Mongoose default connection is disconnected due to application termination',
      { log_to_console: true }
    );
    process.exit(0);
  });
});
