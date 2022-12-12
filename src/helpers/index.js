const logger = require('./logger/winston');
const errorCodes = require('./errors/error-codes');
const { cutPathFromFolder } = require('./utils/stack-info');
const arrayUtils = require('./utils/array');

module.exports = {
  logger,
  cutPathFromFolder,
  errorCodes,
  arrayUtils,
};
