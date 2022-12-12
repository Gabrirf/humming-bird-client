const bcrypt = require('bcryptjs');
const { HttpStatusError } = require('common-errors');
const { decodeBase64 } = require('../helpers');

const { security } = require('../config');

function ipAuth(req, trustedIps) {
  const requestIP = req.ip || req.connection.remoteAddress;
  if (trustedIps && trustedIps.indexOf(requestIP) === -1) {
    throw new HttpStatusError(401, 'IP not recognized');
  }
  return Promise.resolve(true);
}

async function basicAuth(req) {
  if (req.headers.authorization) {
    const [, codedText] = req.headers.authorization.split(' ');
    const decodedText = codedText ? decodeBase64(codedText) : '';
    const [username, pass] = decodedText.split(':');
    try {
      /* Auth by env config */
      const user = { username: security.user };
      user.password = username === user.username ? await bcrypt.hash(security.pass, security.bcryptRounds) : '';
      /** ******************* */
      const validPassword = await bcrypt.compare(pass, user.password);
      if (validPassword) return Promise.resolve(true);
    } catch (err) {
      throw Object.assign(err, { status: 401 });
    }
  }
  throw new HttpStatusError(401, 'You must authenticate to access.');
}

module.exports = {
  ipAuth,
  basicAuth,
};
