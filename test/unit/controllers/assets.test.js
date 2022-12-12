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

const getAssetsByAccountStub = sinon.stub(hummingBirdService, 'getAssetsByAccount');
const activateAssetStub = sinon.stub(hummingBirdService, 'activateAsset');

test('Get assets', async (t) => {
  getAssetsByAccountStub.returns(Promise.resolve(responseMock));
  const query = { accountId: 'accountId' };
  const res = await assetsController.listAssets(mockReq({ query }), mockRes(), mockNext);
  t.is(res.statusCode, 200);
  t.deepEqual(res.body, responseMock);
});

test('Get assets Error', async (t) => {
  getAssetsByAccountStub.rejects(Promise.resolve(errorMock));
  const query = { accountId: 'invalid' };
  const res = await assetsController.listAssets(mockReq({ query }), mockRes(), mockNext);
  t.is(res.code, 'BadRequest');
  t.deepEqual(res, errorMock);
});

test('Activate all assets', async (t) => {
  getAssetsByAccountStub.returns(Promise.resolve([responseMock]));
  activateAssetStub.returns(Promise.resolve(responseMock));
  const body = { accountId: 'accountId' };
  const res = await assetsController.activateAllAssets(mockReq({ body }), mockRes(), mockNext);
  t.is(res.statusCode, 200);
  t.deepEqual(res.body, [responseMock]);
});

test('Activate all assets Error', async (t) => {
  getAssetsByAccountStub.rejects(Promise.resolve(errorMock));
  const body = { accountId: 'invalid' };
  const res = await assetsController.activateAllAssets(mockReq({ body }), mockRes(), mockNext);
  t.is(res.code, 'BadRequest');
  t.deepEqual(res, errorMock);
});
