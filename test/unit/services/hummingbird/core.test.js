const test = require('ava');

const { hummingBirdService } = require('../../../../src/services');
const { hummingbird: config } = require('../../../../src/config');

test.before('Initialize humming bird service', () => {
  hummingBirdService.setConfig(config);
});

test.serial('Test login into humming bird', async (t) => {
  const res = await hummingBirdService.loginIntoHummingBird();
  t.is(res.statusCode, 200);
});

test.serial('Test login into humming bird ERROR', async (t) => {
  hummingBirdService.setConfig({ ...config, password: 'invalid' });
  try {
    await hummingBirdService.loginIntoHummingBird();
  } catch (error) {
    t.is(error.response.statusCode, 401);
  }
});
