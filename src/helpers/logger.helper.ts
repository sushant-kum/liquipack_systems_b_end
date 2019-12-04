import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';
import { default as chalk } from 'chalk';

let logs_dir: string;

if (process.env && process.env.NODE_ENV === 'production') {
  logs_dir = path.join('/tmp', 'liquipack_systems_b_end', 'logs');
} else {
  logs_dir = path.join(require.main ? path.dirname(require.main.filename) : '', 'logs');
}
console.log('logging into ' + logs_dir);

const chalk_log = chalk.bold.white;
const chalk_info = chalk.bold.cyan;
const chalk_warn = chalk.bold.yellow;
const chalk_error = chalk.bold.red;

const log_log_path = path.join(logs_dir, 'log.log');
const info_log_path = path.join(logs_dir, 'info.log');
const warn_log_path = path.join(logs_dir, 'warn.log');
const error_log_path = path.join(logs_dir, 'error.log');

if (!fs.existsSync(logs_dir)) {
  fs.mkdirSync(logs_dir);
}

fs.appendFile(log_log_path, '\n\n[log.log] ' + `${moment().format()} NEW SESSION STARTED`, errorappendFile => {
  if (errorappendFile) {
    console.error('log log file path: ' + log_log_path, 'file creation error:', errorappendFile);
  }
});
fs.appendFile(info_log_path, '\n\n[info.log] ' + `${moment().format()} NEW SESSION STARTED`, errorappendFile => {
  if (errorappendFile) {
    console.error('info log file path: ' + info_log_path, 'file creation error:', errorappendFile);
  }
});
fs.appendFile(warn_log_path, '\n\n[warn.log] ' + `${moment().format()} NEW SESSION STARTED`, errorappendFile => {
  if (errorappendFile) {
    console.error('warn log file path: ' + warn_log_path, 'file creation error:', errorappendFile);
  }
});
fs.appendFile(error_log_path, '\n\n[error.log]' + `${moment().format()} NEW SESSION STARTED`, errorappendFile => {
  if (errorappendFile) {
    console.error('error log file path: ' + error_log_path, 'file creation error:', errorappendFile);
  }
});

function sanitize(log_items: any[]) {
  const STRS_TO_ERADICATE = ['NzFne2LMUXmjqad9bcyXcZHyLpHjUp', 'liquipack_systems_user'];
  const MASKING_STR = '*****************************';

  for (const log_item of log_items) {
    let str_log_item;
    if (typeof log_item === 'object') {
      if (log_item.stack || log_item instanceof Error) {
        str_log_item = log_item.stack;
      } else {
        str_log_item = JSON.stringify(log_item, null, '\t');
      }
    } else {
      str_log_item = log_item;
    }

    if (str_log_item !== undefined) {
      for (const to_be_eradicated of STRS_TO_ERADICATE) {
        str_log_item = str_log_item.replace(to_be_eradicated, MASKING_STR);
      }
    }

    if (typeof log_item === 'object' && str_log_item !== undefined) {
      if (log_item.stack || log_item instanceof Error) {
        log_items[log_items.indexOf(log_item)].stack = str_log_item;
      } else {
        log_items[log_items.indexOf(log_item)] = JSON.parse(str_log_item);
      }
    } else {
      log_items[log_items.indexOf(log_item)] = str_log_item;
    }
  }

  return log_items;
}

export interface LogOptions {
  log_to_console?: boolean;
}

export function log(args: any[], options?: LogOptions): void {
  args = sanitize(args);
  let log_content = '\n[' + moment().toISOString() + '] [LOG] ';
  for (const argument of args) {
    if (options !== undefined && options.log_to_console) {
      if (typeof argument === 'object') {
        if (argument.stack || argument instanceof Error) {
          console.log(
            chalk_log(
              (argument.name ? argument.name : '') + '\n',
              (argument.message ? argument.message : '') + '\n',
              argument.stack ? argument.stack : ''
            )
          );
        } else {
          console.log(chalk_log(JSON.stringify(argument, null, '\t')));
        }
      } else {
        console.log(chalk_log(argument));
      }
    }
    if (typeof argument === 'object') {
      if (argument.stack || argument instanceof Error) {
        log_content +=
          '\n' +
          ((argument.name ? argument.name : '') +
            '\n' +
            (argument.message ? argument.message : '') +
            '\n' +
            (argument.stack ? argument.stack : ''));
      } else {
        log_content += '\n' + JSON.stringify(argument);
      }
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(log_log_path, log_content, errorappendFile => {
    if (errorappendFile) {
      console.error('log.log file path: ' + log_log_path, 'log creation error:', errorappendFile);
    }
  });
}

export function info(args: any[], options?: LogOptions): void {
  args = sanitize(args);
  let log_content = '\n[' + moment().toISOString() + '] [INFO] ';
  for (const argument of args) {
    if (options !== undefined && options.log_to_console) {
      if (typeof argument === 'object') {
        if (argument.stack || argument instanceof Error) {
          console.info(
            chalk_info(
              (argument.name ? argument.name : '') + '\n',
              (argument.message ? argument.message : '') + '\n',
              argument.stack ? argument.stack : ''
            )
          );
        } else {
          console.info(chalk_info(JSON.stringify(argument, null, '\t')));
        }
      } else {
        console.info(chalk_info(argument));
      }
    }
    if (typeof argument === 'object') {
      if (argument.stack || argument instanceof Error) {
        log_content +=
          '\n' +
          ((argument.name ? argument.name : '') +
            '\n' +
            (argument.message ? argument.message : '') +
            '\n' +
            (argument.stack ? argument.stack : ''));
      } else {
        log_content += '\n' + JSON.stringify(argument);
      }
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(info_log_path, log_content, errorappendFile => {
    if (errorappendFile) {
      console.error('info.log file path: ' + info_log_path, 'log creation error:', errorappendFile);
    }
  });
}

export function warn(args: any[], options?: LogOptions): void {
  args = sanitize(args);
  let log_content = '\n[' + moment().toISOString() + '] [WARN] ';
  for (const argument of args) {
    if (options !== undefined && options.log_to_console) {
      if (typeof argument === 'object') {
        if (argument.stack || argument instanceof Error) {
          console.warn(
            chalk_warn(
              (argument.name ? argument.name : '') + '\n',
              (argument.message ? argument.message : '') + '\n',
              argument.stack ? argument.stack : ''
            )
          );
        } else {
          console.warn(chalk_warn(JSON.stringify(argument, null, '\t')));
        }
      } else {
        console.warn(chalk_warn(argument));
      }
    }
    if (typeof argument === 'object') {
      if (argument.stack || argument instanceof Error) {
        log_content +=
          '\n' +
          ((argument.name ? argument.name : '') +
            '\n' +
            (argument.message ? argument.message : '') +
            '\n' +
            (argument.stack ? argument.stack : ''));
      } else {
        log_content += '\n' + JSON.stringify(argument);
      }
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(warn_log_path, log_content, errorappendFile => {
    if (errorappendFile) {
      console.error('warn.log file path: ' + warn_log_path, 'log creation error:', errorappendFile);
    }
  });
}

export function error(args: any[], options?: LogOptions): void {
  args = sanitize(args);
  let log_content = '\n[' + moment().toISOString() + '] [ERROR] ';
  for (const argument of args) {
    if (options !== undefined && options.log_to_console) {
      if (typeof argument === 'object') {
        if (argument.stack || argument instanceof Error) {
          console.error(
            chalk_error(
              (argument.name ? argument.name : '') + '\n',
              (argument.message ? argument.message : '') + '\n',
              argument.stack ? argument.stack : ''
            )
          );
        } else {
          console.error(chalk_error(JSON.stringify(argument, null, '\t')));
        }
      } else {
        console.error(chalk_error(argument));
      }
    }
    if (typeof argument === 'object') {
      if (argument.stack || argument instanceof Error) {
        log_content +=
          '\n' +
          ((argument.name ? argument.name : '') +
            '\n' +
            (argument.message ? argument.message : '') +
            '\n' +
            (argument.stack ? argument.stack : ''));
      } else {
        log_content += '\n' + JSON.stringify(argument);
      }
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(error_log_path, log_content, errorappendFile => {
    if (errorappendFile) {
      console.error('error.log file path: ' + error_log_path, 'log creation error:', errorappendFile);
    }
  });
}
