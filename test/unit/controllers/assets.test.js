const test = require('ava');
const sinon = require('sinon');

const { assetsController } = require('../../../src/controllers');
const { hummingBirdService } = require('../../../src/services');

const { mockReq, mockRes, mockNext } = require('../../utils/controllers');

const responseMock = { body: 'ok' };

const errorMock = {
  code: 'BadRequest',
  message: 'There was a problem with your data, please try again.',
};

const hummingBirdServiceStub = sinon.stub(hummingBirdService, 'getAssetsByAccount');

test('Get assets', async (t) => {
  hummingBirdServiceStub.returns(Promise.resolve(responseMock));
  const query = { accountId: 'accountId' };
  const res = await assetsController.listAssets(mockReq({ query }), mockRes(), mockNext);
  t.is(res.statusCode, 200);
  t.deepEqual(res.body, responseMock);
});

test('Create user Error', async (t) => {
  hummingBirdServiceStub.rejects(Promise.resolve(errorMock));
  const query = { accountId: 'invalid' };
  const res = await assetsController.listAssets(mockReq({ query }), mockRes(), mockNext);
  t.is(res.code, 'BadRequest');
  t.deepEqual(res, errorMock);
});
