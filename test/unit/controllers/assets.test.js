const test = require('ava');
const sinon = require('sinon');

const { assetsController } = require('../../../src/controllers');
const { hummingBirdService } = require('../../../src/services');

const { mockReq, mockRes, mockNext } = require('../../utils/controllers');

const responseAssetMock = { body: 'asset' };
const responseSubsMock = { body: 'ok' };

const errorMock = {
  code: 'BadRequest',
  message: 'There was a problem with your data, please try again.',
};

const getAssetsByAccountStub = sinon.stub(hummingBirdService, 'getAssetsByAccount');
const activateAssetStub = sinon.stub(hummingBirdService, 'activateAsset');

test('Get assets', async (t) => {
  getAssetsByAccountStub.returns(Promise.resolve(getAssetsByAccountStub));
  const query = { accountId: 'accountId' };
  const res = await assetsController.listAssets(mockReq({ query }), mockRes(), mockNext);
  t.is(res.statusCode, 200);
  t.deepEqual(res.body, getAssetsByAccountStub);
});

test('Get assets Error', async (t) => {
  getAssetsByAccountStub.rejects(Promise.resolve(errorMock));
  const query = { accountId: 'invalid' };
  const res = await assetsController.listAssets(mockReq({ query }), mockRes(), mockNext);
  t.is(res.code, 'BadRequest');
  t.deepEqual(res, errorMock);
});

test('Activate all assets', async (t) => {
  getAssetsByAccountStub.returns(Promise.resolve([responseAssetMock]));
  activateAssetStub.returns(Promise.resolve(responseSubsMock));
  const body = { accountId: 'accountId' };
  const res = await assetsController.activateAllAssets(mockReq({ body }), mockRes(), mockNext);
  t.is(res.statusCode, 200);
  t.deepEqual(res.body, [responseSubsMock]);
});

test('Activate all assets Error', async (t) => {
  getAssetsByAccountStub.rejects(Promise.resolve(errorMock));
  const body = { accountId: 'invalid' };
  const res = await assetsController.activateAllAssets(mockReq({ body }), mockRes(), mockNext);
  t.is(res.code, 'BadRequest');
  t.deepEqual(res, errorMock);
});
