const test = require('ava');

const securityHandler = require('../../../src/middlewares/security-handler');

const { mockReq } = require('../../utils/controllers');

const { ipAuth } = securityHandler;

const config = {
  security: {
    trustedIps: ['::ffff:127.0.0.1'],
  },
};

test('IP Auth Disabled', async (t) => {
  const req = mockReq({ ip: '0.0.0.0' });
  const pass = await ipAuth(req);
  t.is(pass, true);
});

test('IP Auth Pass with IP', async (t) => {
  const req = mockReq({ ip: '::ffff:127.0.0.1' });
  const pass = await ipAuth(req, config.security.trustedIps);
  t.is(pass, true);
});

test('IP Auth Pass with remoteAddress', async (t) => {
  const req = mockReq({ connection: { remoteAddress: '::ffff:127.0.0.1' } });
  const pass = await ipAuth(req, config.security.trustedIps);
  t.is(pass, true);
});

test('IP Auth Error', async (t) => {
  const req = mockReq({ ip: '0.0.0.0' });
  try {
    await ipAuth(req, config.security.trustedIps);
  } catch (error) {
    t.is(error.status, 401);
    t.is(error.message, 'IP not recognized');
  }
});
