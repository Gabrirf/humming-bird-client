const test = require('ava');

const { pingController } = require('../../../src/controllers');

const { mockReq, mockRes, mockNext } = require('../../utils/controllers');

test.serial('Get Ping', async t => {
  const res = await pingController.getPing(mockReq(), mockRes(), mockNext);
  t.is(res.statusCode, 200);
  t.is(res.body, 'pong');
});

test.serial('Post Ping', async t => {
  const body = { test: 'pong' };
  const res = await pingController.postPing(mockReq({ body }), mockRes(), mockNext);
  t.is(res.statusCode, 201);
  t.deepEqual(res.body, body);
});

test.serial('Put Ping', async t => {
  const res = await pingController.putPing(mockReq(), mockRes(), mockNext);
  t.is(res.statusCode, 404);
  t.is(res.message, 'The app with \'undefined\' id not exist');
});

test.serial('Delete Ping', async t => {
  const res = await pingController.deletePing(mockReq(), mockRes(), mockNext);
  t.is(res.statusCode, 404);
  t.is(res.message, 'The app with \'undefined\' id not exist');
});
