const moment = require('moment');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const logs_dir = path.dirname(require.main.filename) + '/logs/';
console.log('logging into ' + logs_dir);

const log = chalk.bold.white;
const info = chalk.bold.cyan;
const warn = chalk.bold.yellow;
const error = chalk.bold.red;

const console_log_path = logs_dir + 'console.log';
const log_log_path = logs_dir + 'log.log';
const info_log_path = logs_dir + 'info.log';
const warn_log_path = logs_dir + 'warn.log';
const error_log_path = logs_dir + 'error.log';

if (!fs.existsSync(logs_dir)) {
  fs.mkdirSync(logs_dir);
}

fs.appendFile(console_log_path, '\n\n[console.log] ' + moment().format(), function(error) {
  if (error) {
    console.error('console log file path: ' + console_log_path, 'file creation error:', error);
  }
});
fs.appendFile(log_log_path, '\n\n[log.log] ' + moment().format(), function(error) {
  if (error) {
    console.error('log log file path: ' + log_log_path, 'file creation error:', error);
  }
});
fs.appendFile(info_log_path, '\n\n[info.log] ' + moment().format(), function(error) {
  if (error) {
    console.error('info log file path: ' + info_log_path, 'file creation error:', error);
  }
});
fs.appendFile(warn_log_path, '\n\n[warn.log] ' + moment().format(), function(error) {
  if (error) {
    console.error('warn log file path: ' + warn_log_path, 'file creation error:', error);
  }
});
fs.appendFile(error_log_path, '\n\n[error.log]' + moment().format(), function(error) {
  if (error) {
    console.error('error log file path: ' + error_log_path, 'file creation error:', error);
  }
});

exports.log = function(...args) {
  let log_content = '\n[' + moment().toISOString() + '] [LOG] ';
  for (let i = 0; i < args.length; i++) {
    const argument = args[i];
    if (i == args.length - 1 && typeof argument == 'object' && argument.log_to_console != undefined) {
      if (argument.log_to_console != undefined && argument.log_to_console == true) {
        for (let j = 0; j < args.length - 1; j++) {
          if (typeof args[j] == 'object') {
            if (argument instanceof Error) console.log(log(args[j].stack));
            else console.log(log(JSON.stringify(args[j], null, '\t')));
          } else {
            console.log(log(args[j]));
          }
        }
      }
    }
    if (typeof argument == 'object') {
      if (argument instanceof Error) log_content += '\n' + argument.stack;
      else log_content += '\n' + JSON.stringify(argument);
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(log_log_path, log_content, function(error) {
    if (error) {
      console.error('log.log file path: ' + log_log_path, 'log creation error:', error);
    }
  });
};

exports.info = function(...args) {
  let log_content = '\n[' + moment().toISOString() + '] [INFO] ';
  for (let i = 0; i < args.length; i++) {
    const argument = args[i];
    if (i == args.length - 1 && typeof argument == 'object' && argument.log_to_console != undefined) {
      if (argument.log_to_console != undefined && argument.log_to_console == true) {
        for (let j = 0; j < args.length - 1; j++) {
          if (typeof args[j] == 'object') {
            if (argument instanceof Error) {
              console.info(info(args[j].stack));
            } else console.info(info(JSON.stringify(args[j], null, '\t')));
          } else {
            console.info(info(args[j]));
          }
        }
      }
    }
    if (typeof argument == 'object') {
      if (argument instanceof Error) log_content += '\n' + argument.stack;
      else log_content += '\n' + JSON.stringify(argument);
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(info_log_path, log_content, function(error) {
    if (error) {
      console.error('info.log file path: ' + info_log_path, 'log creation error:', error);
    }
  });
};

exports.warn = function(...args) {
  let log_content = '\n[' + moment().toISOString() + '] [WARN] ';
  for (let i = 0; i < args.length; i++) {
    const argument = args[i];
    if (i == args.length - 1 && typeof argument == 'object' && argument.log_to_console != undefined) {
      if (argument.log_to_console != undefined && argument.log_to_console == true) {
        for (let j = 0; j < args.length - 1; j++) {
          if (typeof args[j] == 'object') {
            if (argument instanceof Error) {
              console.warn(warn(args[j].stack));
            } else console.warn(warn(JSON.stringify(args[j], null, '\t')));
          } else {
            console.warn(warn(args[j]));
          }
        }
      }
    }
    if (typeof argument == 'object') {
      if (argument instanceof Error) log_content += '\n' + argument.stack;
      else log_content += '\n' + JSON.stringify(argument);
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(warn_log_path, log_content, function(error) {
    if (error) {
      console.error('warn.log file path: ' + warn_log_path, 'log creation error:', error);
    }
  });
};

exports.error = function(...args) {
  let log_content = '\n[' + moment().toISOString() + '] [ERROR] ';
  for (let i = 0; i < args.length; i++) {
    const argument = args[i];
    if (i == args.length - 1 && typeof argument == 'object' && argument.log_to_console != undefined) {
      if (argument.log_to_console != undefined && argument.log_to_console == true) {
        for (let j = 0; j < args.length - 1; j++) {
          if (typeof args[j] == 'object') {
            if (argument instanceof Error) {
              console.error(error(args[j].stack));
            } else {
              console.error(error(JSON.stringify(args[j], null, '\t')));
            }
          } else {
            console.error(error(args[j]));
          }
        }
      }
    }
    if (typeof argument == 'object') {
      if (argument instanceof Error) log_content += '\n' + argument.stack;
      else log_content += '\n' + JSON.stringify(argument);
    } else {
      log_content += '\n' + argument;
    }
  }
  fs.appendFile(error_log_path, log_content, function(error) {
    if (error) {
      console.error('error.log file path: ' + error_log_path, 'log creation error:', error);
    }
  });
};
