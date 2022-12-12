const winston = require('winston');

const { getStackInfo } = require('../utils/stack-info');
const options = require('../../config/winston');

const { format, transports, createLogger } = winston;

const {
  combine, timestamp, printf, colorize,
} = format;

const logger = createLogger({
  transports: [
    new transports.Console({
      ...options.console,
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
      ),
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
  exitOnError: false,
});

function formatLogArguments(args) {
  const argsArray = Array.prototype.slice.call(args);

  const stackInfo = getStackInfo(1);
  let calleeStr = '';
  if (typeof (argsArray[1]) === 'string') {
    calleeStr = `(${argsArray[1]})`;
  } else if (stackInfo) {
    calleeStr = `(${stackInfo.relativePath}:${stackInfo.line})`;
  }

  if (typeof (argsArray[0]) === 'string') {
    argsArray[0] = `${calleeStr} ${argsArray[0]}`;
  } else {
    argsArray.unshift(calleeStr);
  }

  return {
    line: stackInfo.line,
    relativePath: stackInfo.relativePath,
    message: argsArray[0],
  };
}

const debug = function debug(...args) {
  logger.log('debug', formatLogArguments(args));
};

const info = function info(...args) {
  logger.log('info', formatLogArguments(args));
};

const warn = function warn(...args) {
  logger.log('warn', formatLogArguments(args));
};

const error = function error(...args) {
  logger.log('error', formatLogArguments(args));
};

const log = logger;

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

const { stream } = logger;

module.exports = {
  debug,
  info,
  warn,
  error,
  stream,
  log,
};
