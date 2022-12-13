const { logger, cutPathFromFolder, errorCodes } = require('../helpers');

function getTrackPath(err) {
  const errorTrack = err.stack ? err.stack.split('\n').slice(3) : [];
  const errorPathFullString = errorTrack[0] || (new Error()).stack.split('\n').slice(3)[5];
  const relativeErrorPath = errorPathFullString ? cutPathFromFolder(errorPathFullString) : 'unknown:path';
  const [errorPath, errorLine] = relativeErrorPath.split(':');
  const trackPath = errorLine ? `${errorPath}:${errorLine}` : 'unknown';
  return trackPath;
}

// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, _next) {
  const { method, path, body } = req;

  const formatOpenapiErrors = (errors) => errors.map(
    (e) => `${e.errorCode.split('.')[0]}${e.path ? `(${e.path})` : ''}: ${e.message}`,
  ).join(', ');

  const status = err.status ? err.status
    : err.stack.search('ValidationError') !== -1 ? 400
      : res.statusCode >= 400 ? res.statusCode
        : 500;
  const message = err.message ? err.message
    : Array.isArray(err.errors) ? formatOpenapiErrors(err.errors)
      : 'Server Error';
  const source = err.name ? err.name
    : err.errors ? err.errors[0].errorCode
      : getTrackPath(err);

  const code = err.code || status;

  if (status >= 500) {
    const errorMessage = status === 501 ? message : 'Server Error';
    logger.error(`[${method}] ${status} ${path} ${err.stack || message}\n${JSON.stringify(body)}`, source);
    return res.status(status).send({ code, type: errorCodes[code], message: errorMessage });
  }
  logger.info(`[${method}] ${status} ${path} ${message}\n${JSON.stringify(body)}`, source);
  return res.status(status).send({ code, type: errorCodes[code], message });
};
