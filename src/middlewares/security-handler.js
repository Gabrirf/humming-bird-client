const { HttpStatusError } = require('common-errors');

function ipAuth(req, trustedIps) {
  const requestIP = req.ip || req.connection.remoteAddress;
  if (trustedIps && trustedIps.indexOf(requestIP) === -1) {
    throw new HttpStatusError(401, 'IP not recognized');
  }
  return Promise.resolve(true);
}

module.exports = {
  ipAuth,
};
