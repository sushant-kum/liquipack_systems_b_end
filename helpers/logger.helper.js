let moment = require('moment');
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');

const logs_dir = path.dirname(require.main.filename) + "/logs/";
console.log("logging into " + logs_dir);

let log = chalk.bold.white;
var info = chalk.bold.cyan;
var warn = chalk.bold.yellow;
var error = chalk.bold.red;

const console_log_path = logs_dir + "console.log";
const log_log_path = logs_dir + "log.log";
const info_log_path = logs_dir + "info.log";
const warn_log_path = logs_dir + "warn.log";
const error_log_path = logs_dir + "error.log";

if (!fs.existsSync(logs_dir)) {
  fs.mkdirSync(logs_dir);
}

fs.appendFile(console_log_path, "\n\n[console.log] " + moment().format(), function (error) {
  if (error)
    console.error("console log file path: " + console_log_path, "file creation error:", error);
});
fs.appendFile(log_log_path, "\n\n[log.log] " + moment().format(), function (error) {
  if (error)
    console.error("log log file path: " + log_log_path, "file creation error:", error);
});
fs.appendFile(info_log_path, "\n\n[info.log] " + moment().format(), function (error) {
  if (error)
    console.error("info log file path: " + info_log_path, "file creation error:", error);
});
fs.appendFile(warn_log_path, "\n\n[warn.log] " + moment().format(), function (error) {
  if (error)
    console.error("warn log file path: " + warn_log_path, "file creation error:", error);
});
fs.appendFile(error_log_path, "\n\n[error.log]" + moment().format(), function (error) {
  if (error)
    console.error("error log file path: " + error_log_path, "file creation error:", error);
});

exports.log = function () {
  let log_content = "\n[" + moment().toISOString() + "] [LOG] ";
  for (let i = 0; i < arguments.length; i++) {
    let argument = arguments[i];
    if (i == arguments.length - 1 && typeof argument == "object" && (argument.log_to_console != undefined)) {
      if (argument.log_to_console != undefined && argument.log_to_console == true)
        for (let j = 0; j < arguments.length - 1; j++) {
          if (typeof arguments[j] == "object") {
            if (argument instanceof Error)
              console.log(log(arguments[j].stack));
            else
              console.log(log(JSON.stringify(arguments[j], null, "\t")));
          }
          else {
            console.log(log(arguments[j]));
          }
        }
    }
    if (typeof argument == "object") {
      if (argument instanceof Error)
        log_content += "\n" + argument.stack;
      else
        log_content += "\n" + JSON.stringify(argument);
    }
    else {
      log_content += "\n" + argument;
    }
  }
  fs.appendFile(log_log_path, log_content, function (error) {
    if (error)
      console.error("log.log file path: " + log_log_path, "log creation error:", error);
  });
};

exports.info = function () {
  let log_content = "\n[" + moment().toISOString() + "] [INFO] ";
  for (let i = 0; i < arguments.length; i++) {
    let argument = arguments[i];
    if (i == arguments.length - 1 && typeof argument == "object" && (argument.log_to_console != undefined)) {
      if (argument.log_to_console != undefined && argument.log_to_console == true)
        for (let j = 0; j < arguments.length - 1; j++) {
          if (typeof arguments[j] == "object") {
            if (argument instanceof Error)
              console.info(info(arguments[j].stack));
            else
              console.info(info(JSON.stringify(arguments[j], null, "\t")));
          }
          else {
            console.info(info(arguments[j]));
          }
        }
    }
    if (typeof argument == "object") {
      if (argument instanceof Error)
        log_content += "\n" + argument.stack;
      else
        log_content += "\n" + JSON.stringify(argument);
    }
    else {
      log_content += "\n" + argument;
    }
  }
  fs.appendFile(info_log_path, log_content, function (error) {
    if (error)
      console.error("info.log file path: " + info_log_path, "log creation error:", error);
  });
};

exports.warn = function () {
  let log_content = "\n[" + moment().toISOString() + "] [WARN] ";
  for (let i = 0; i < arguments.length; i++) {
    let argument = arguments[i];
    if (i == arguments.length - 1 && typeof argument == "object" && (argument.log_to_console != undefined)) {
      if (argument.log_to_console != undefined && argument.log_to_console == true)
        for (let j = 0; j < arguments.length - 1; j++) {
          if (typeof arguments[j] == "object") {
            if (argument instanceof Error)
              console.warn(warn(arguments[j].stack));
            else
              console.warn(warn(JSON.stringify(arguments[j], null, "\t")));
          }
          else {
            console.warn(warn(arguments[j]));
          }
        }
    }
    if (typeof argument == "object") {
      if (argument instanceof Error)
        log_content += "\n" + argument.stack;
      else
        log_content += "\n" + JSON.stringify(argument);
    }
    else {
      log_content += "\n" + argument;
    }
  }
  fs.appendFile(warn_log_path, log_content, function (error) {
    if (error)
      console.error("warn.log file path: " + warn_log_path, "log creation error:", error);
  });
};

exports.error = function () {
  let log_content = "\n[" + moment().toISOString() + "] [ERROR] ";
  for (let i = 0; i < arguments.length; i++) {
    let argument = arguments[i];
    if (i == arguments.length - 1 && typeof argument == "object" && (argument.log_to_console != undefined)) {
      if (argument.log_to_console != undefined && argument.log_to_console == true)
        for (let j = 0; j < arguments.length - 1; j++) {
          if (typeof arguments[j] == "object") {
            if (argument instanceof Error)
              console.error(error(arguments[j].stack));
            else
              console.error(error(JSON.stringify(arguments[j], null, "\t")));
          }
          else {
            console.error(error(arguments[j]));
          }
        }
    }
    if (typeof argument == "object") {
      if (argument instanceof Error)
        log_content += "\n" + argument.stack;
      else
        log_content += "\n" + JSON.stringify(argument);
    }
    else {
      log_content += "\n" + argument;
    }
  }
  fs.appendFile(error_log_path, log_content, function (error) {
    if (error)
      console.error("error.log file path: " + error_log_path, "log creation error:", error);
  });
};