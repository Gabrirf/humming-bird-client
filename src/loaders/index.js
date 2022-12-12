const expressLoader = require('./express');
const hummingbirdLoader = require('./hummingbird');

function init(app, config) {
  expressLoader(app, config.security);
  hummingbirdLoader(config.hummingbird);
}

module.exports = {
  init,
};
