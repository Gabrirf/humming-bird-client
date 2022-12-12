const test = require('ava');
const sinon = require('sinon');
const got = require('got');

const { hummingBirdService } = require('../../../../src/services');

const responseMock = {
  body: {
    token: 'token',
  },
};

const errorMock = {
  response: {
    statusCode: 400,
  },
};

const payloadMock = {
  accoundId: 'accountId',
  username: 'username',
  password: 'password',
  email: 'email',
  status: 'status',
  permissions: [
    {
      accountId: 'accountId',
      roles: [
        'role',
      ],
    },
  ],
};

const getStub = sinon.stub(got, 'get');
const putStub = sinon.stub(got, 'put');

test.serial('Test create user to humming bird', async (t) => {
  getStub.returns(responseMock);
  const res = await hummingBirdService.getAssetsByAccount('accountId');
  t.is(res.token, responseMock.body.token);
});

test.serial('Test create user to humming bird ERROR', async (t) => {
  getStub.rejects(errorMock);
  const res = await hummingBirdService.getAssetsByAccount('');
  t.is(res.response.statusCode, errorMock.response.statusCode);
});

test.serial('Test activate asset to humming bird', async (t) => {
  putStub.returns(responseMock);
  const res = await hummingBirdService.activateAsset('accountId', payloadMock);
  t.is(res.token, responseMock.body.token);
});

test.serial('Test activate asset to humming bird ERROR', async (t) => {
  putStub.rejects(errorMock);
  const res = await hummingBirdService.activateAsset('', payloadMock);
  t.is(res.response.statusCode, errorMock.response.statusCode);
});
