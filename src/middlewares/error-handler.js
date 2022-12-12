const { logger, cutPathFromFolder, errorCodes } = require('../helpers');

function getTrackPath(err) {
  const errorTrack = err.stack ? err.stack.split('\n').slice(3) : [];
  const errorPathFullString = errorTrack[0] || (new Error()).stack.split('\n').slice(3)[5];
  const relativeErrorPath = errorPathFullString ? cutPathFromFolder(errorPathFullString) : 'unknown:path';
  const [errorPath, errorLine] = relativeErrorPath.split(':');
  const trackPath = errorLine ? `${errorPath}:${errorLine}` : 'unknown';
  return trackPath;
}

module.exports = function errorHandler(err, req, res) {
  const { method, path } = req;
  const status = err.status || (res.statusCode >= 400 ? res.statusCode : 500);
  const message = err.message || (Array.isArray(err.errors) ? err.errors.map(e => `${e.path} ${e.message}`).join(', ') : 'Server Error');
  const source = err.name || (err.errors ? err.errors[0].errorCode : getTrackPath(err));
  const code = err.code || status;

  if (status >= 500) {
    logger.error(`[${method}] ${status} ${path} ${err.stack || message}`, source);
    return res.status(status).send({ code, name: errorCodes[code], message: 'Server Error' });
  }
  logger.info(`[${method}] ${status} ${path} ${message}`, source);
  return res.status(status).send({ code, name: errorCodes[code], message });
};
