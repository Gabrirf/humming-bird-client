const logger = require('./logger/winston');
const errorCodes = require('./errors/error-codes');
const { cutPathFromFolder } = require('./utils/stack-info');

module.exports = {
  logger,
  cutPathFromFolder,
  errorCodes,
};
