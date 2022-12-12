const expressLoader = require('./express');

function init(app, config) {
  expressLoader(app, config.security);
}

module.exports = {
  init,
};
