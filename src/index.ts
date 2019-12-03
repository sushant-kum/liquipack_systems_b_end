if (!process.env.IS_TS_NODE) {
  // tslint:disable-next-line:no-var-requires
  require('module-alias/register');
}

import { Express, Request, Response } from 'express';
const express = require('express');
import * as cors from 'cors';
import * as body_parser from 'body-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import { router as api_router } from '@app/routers/api.router';
import { router as apidoc_router } from '@app/routers/api-doc.router';
import * as db_config from '@app/configs/db.config';
import * as cors_config from '@app/configs/cors.config';
import * as status_monitoring_config from '@app/configs/status-monitoring.config';
import * as logger from '@app/helpers/logger.helper';

// Do not change to import format, as files are not in rootDir
require('@project-root/tools/version-info-gen/version-info-gen.js').generate();
const version_info = require('@project-root/version-info.json');

const port = process.env.PORT || 8080;

mongoose.connect(db_config.connection_string, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => {
  logger.error([error]);
  logger.error([
    'Error connecting to db_config:',
    db_config.config,
    'connection_string: ',
    db_config.connection_string
  ]);
});
db.on('connected', () => {
  logger.log(['Connected to db_config:', db_config.config], {
    log_to_console: true
  });

  const app: Express = express();

  // Status monitoring
  app.use(require('express-status-monitor')(status_monitoring_config.options));

  // Add CORS headers
  app.use(cors(cors_config.options));

  app.use(passport.initialize());

  // for parsing application/xwww-form-urlencoded
  app.use(
    body_parser.urlencoded({
      extended: true
    })
  );
  // for parsing application/json
  app.use(body_parser.json());

  app.get('/', (req: Request, res: Response) => {
    res.json({
      status: 'success',
      message: 'Welcome to liquipack_systems APIs crafted with love!',
      version: version_info.version,
      deploy_date: version_info.release_date_time
    });
  });

  app.get('/version', (req: Request, res: Response) => {
    res.json({
      status: 'success',
      version_info
    });
  });

  app.use('/api', api_router);
  app.use('/api-doc', apidoc_router);
  app.use('/assets', express.static('public/assets'));

  app.listen(port, () => {
    logger.log(['Started liquipack_systems API service on port ' + port], {
      log_to_console: true
    });
  });
});
db.on('disconnected', () => {
  logger.error(['Disconnected from db_config:', db_config.config], { log_to_console: true });
});

process.on('SIGINT', () => {
  db.close(() => {
    logger.error(['Mongoose default connection is disconnected due to application termination'], {
      log_to_console: true
    });
    process.exit(0);
  });
});
