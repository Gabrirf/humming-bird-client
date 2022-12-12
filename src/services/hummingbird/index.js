const core = require('./core');
const users = require('./users');
const assets = require('./assets');

module.exports = {
  ...core,
  ...users,
  ...assets,
};
