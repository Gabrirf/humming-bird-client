const { initialize } = require('express-openapi');
const path = require('path');
const { HttpStatusError } = require('common-errors');

const { apiDoc } = require('../openapi/api-doc');
const services = require('../services');
const controllers = require('../controllers');
const errorMiddleware = require('../middlewares/error-handler');
const { ipAuth, basicAuth } = require('../middlewares/security-handler');

module.exports = (app, config) => initialize({
  apiDoc,
  errorMiddleware,
  app,
  dependencies: {
    ...services,
    ...controllers,
  },
  paths: path.resolve(__dirname, '../routes'),
  promiseMode: true,
  securityHandlers: {
    disabled: () => { throw new HttpStatusError(405, 'This method has been disabled'); },
    ipAuth: req => ipAuth(req, config.trustedIps),
    basicAuth,
  },
});
