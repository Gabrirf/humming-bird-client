const express = require('express');
const { HttpStatusError } = require('common-errors');
const swaggerUi = require('swagger-ui-express');

const errorMiddleware = require('../middlewares/error-handler');
const initApiDoc = require('../config/openapi');

module.exports = (expressApp, config) => {
  const { apiDoc } = initApiDoc(expressApp, config);
  expressApp.use(express.json({ limit: '50mb' }));
  expressApp.use(express.urlencoded({ limit: '50mb', extended: true }));
  expressApp.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
  expressApp.use((req, res) => {
    errorMiddleware(new HttpStatusError(404, 'Resource not found'), req, res);
  });
};
